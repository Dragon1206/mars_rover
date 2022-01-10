"use strict";

const { marsRoverRead } = require("../services/read");
const { marsRoverProcess } = require("../services/process");
const { marsRoverCompiler } = require("../services/compiler");

class MarsRoverController {
    async execute(prompt, instructionRegex, instructionEnum, directionsEnum, roverCount) {
        let roverCoordinates = {},
            roverInstructions = {},
            count = 1;
        /**Read plateau co-ordinates */
        const plateauCoordinates = await this.getPlateauCoordinates(prompt, marsRoverRead, marsRoverProcess);
        while (count <= roverCount) {
            try {
                roverCoordinates[count] = await this.getRoverCoordinates(prompt, plateauCoordinates, directionsEnum, count);
                roverInstructions[count] = await this.getRoverInstructions(prompt, instructionRegex, instructionEnum, count);
                count++;
            } catch (error) {
                console.error("[ERROR]", error.message);
            }
        }
        count = 1;
        while (count <= roverCount) {
            try {
                const directionMax = Object.values(directionsEnum).length;
                const directionMin = 1;
                const { command } = roverInstructions[count];
                const roverPosition = marsRoverCompiler.compileInstruction(roverCoordinates[count], command, directionsEnum, instructionEnum, plateauCoordinates, directionMax, directionMin, count)
                console.log(roverPosition);
            } catch (error) { console.log(error); throw error; }
            count++;
        }
        prompt.close();
    }

    async getPlateauCoordinates(prompt) {
        let plateauCoordinates,
            status = true;
        do {
            try {
                const plateauSize = await marsRoverRead.getPlateauSize(prompt);
                plateauCoordinates = marsRoverProcess.verifyPlateauSize(plateauSize);
                status = false;
            } catch (error) {
                status = true;
                console.error("[ERROR]", error.message);
            }
        } while (status);
        return plateauCoordinates;
    }

    async getRoverCoordinates(prompt, plateauCoordinates, directionsEnum, count) {
        let roverCoordinates,
            status = true;
        do {
            try {
                const location = await marsRoverRead.getRoverLocation(prompt, count);
                roverCoordinates = marsRoverProcess.verifyRoverLocation(location, plateauCoordinates, directionsEnum);
                status = false;
            } catch (error) {
                status = true;
                console.error("[ERROR]", error.message);
            }
        } while (status);
        return roverCoordinates;
    }

    async getRoverInstructions(prompt, instructionRegex, instructionEnum, count) {
        let command,
            status = true;
        do {
            try {
                const instruction = await marsRoverRead.getRoverInstruction(prompt, count);
                command = await marsRoverProcess.verifyRoverInstruction(instruction, instructionRegex, instructionEnum);
                status = false;
            } catch (error) {
                status = true;
                console.error("[ERROR]", error.message);
            }
        } while (status);
        return { command };
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }
}

const marsRoverController = new MarsRoverController();
module.exports = { marsRoverController };
