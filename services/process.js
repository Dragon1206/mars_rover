"use strict";
const joi = require("joi");

class MarsRoverProcess {

    /**
     * @method verifyPlateauSize
     * @description This method validates input received for plateau size 
     * @param {String} obj 
     * @returns {Object}
     * @throws {Error}
     */
    verifyPlateauSize(obj) {
        try {
            const coordinates = obj.trim(" ").split(" ");
            if (coordinates.length === 2) {
                const xAxisMax = parseInt(coordinates[0]);
                const yAxisMax = parseInt(coordinates[1]);
                const xAxisMin = 0;
                const yAxisMin = 0;
                /** Joi validation object */
                const object = joi.object().keys({ xAxisMax: joi.number().min(1).required(), yAxisMax: joi.number().min(1).required(), xAxisMin: joi.number().min(0).required(), yAxisMin: joi.number().min(0).required() });
                const { error } = object.validate({ xAxisMax, yAxisMax, xAxisMin, yAxisMin });
                if (error) {
                    throw new Error("Invalid input: co-ordinates can only be possitive integers greated than 0");
                }
                return { xAxisMax, yAxisMax, xAxisMin, yAxisMin };
            } else {
                throw new Error("Invalid input: Plateau can only have 2 co-ordinates (x, y)");
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method verifyRoverLocation
     * @description This method validates input received for rover location
     * @param {String} location 
     * @param {Object} plateauCoordinates 
     * @param {Enum} directionsEnum 
     * @returns {Object}
     * @throws {Error}
     */
    verifyRoverLocation(location, plateauCoordinates, directionsEnum) {
        try {
            const roverCoordinates = location.trim(" ").split(" ");
            const { xAxisMax, yAxisMax, xAxisMin, yAxisMin } = plateauCoordinates;
            if (roverCoordinates.length === 3) {
                const xAxis = parseInt(roverCoordinates[0]);
                const yAxis = parseInt(roverCoordinates[1]);
                const direction = directionsEnum[roverCoordinates[2]];
                /** Joi validation object */
                const object = joi.object().keys({ xAxis: joi.number().min(xAxisMin).max(xAxisMax).required(), yAxis: joi.number().min(yAxisMin).max(yAxisMax).required(), direction: joi.number().required() });
                const { error } = object.validate({ xAxis, yAxis, direction });
                if (error) {
                    throw new Error(`Invalid input: co-ordinates can be only positive numbers and within bounds`);
                }
                return { xAxis, yAxis, direction };
            } else {
                throw new Error("Invalid input: Rover location coordinates incorrect (x, y, direction [N or E or S or W])");
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * @method verifyRoverInstruction
     * @description This method validates instruction received for rover
     * @param {String} instruction 
     * @param {String} instructionRegex 
     * @param {Enum} instructionEnum 
     * @returns {String}
     * @throws {Error}
     */
    verifyRoverInstruction(instruction, instructionRegex, instructionEnum) {
        try {
            const values = Object.keys(instructionEnum).toString();
            const regex = new RegExp(instructionRegex);
            const object = joi.object().keys({ instruction: joi.string().regex(regex).required() });
            const { error } = object.validate({ instruction });
            if (error) {
                throw new Error(`Invalid input: accepted inputs [${values}]`);
            }
            return instruction;
        } catch (error) {
            throw error;
        }
    }

}

const marsRoverProcess = new MarsRoverProcess();
module.exports = { marsRoverProcess };
