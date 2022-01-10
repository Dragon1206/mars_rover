"use strict"

class MarsRoverCompiler {

    /**
     * @method compileInstruction
     * @description This function will complies a set of commands for a single mars rover
     * @param {Object} roverPosition 
     * @param {String} command 
     * @param {Enum} directionsEnum 
     * @param {Enum} instructionEnum 
     * @param {Object} plateauCoordinates 
     * @param {Number} directionMax 
     * @param {Number} directionMin 
     * @param {Number} count 
     * @returns {String} 
     * @throws {Error}
     */
    compileInstruction(roverPosition, command, directionsEnum, instructionEnum, plateauCoordinates, directionMax, directionMin, count) {
        try {
            let commandCount = 0;
            const commandLength = command.length;
            while (commandCount < commandLength) {
                try {
                    const iterateCommand = command.charAt(commandCount);
                    roverPosition = this.executeCommand(instructionEnum[iterateCommand], roverPosition, plateauCoordinates, directionMax, directionMin, count);
                    commandCount++;
                } catch (error) {
                    console.error("[ERROR]", error.message);
                    commandCount = commandLength;
                }
            }
            return `ROVER[${count}]: ${roverPosition.xAxis} ${roverPosition.yAxis} ${this.getKeyByValue(directionsEnum, roverPosition.direction)}`;
        } catch (error) { throw error; }
    }

    /**
     * @method executeCommand
     * @description This function will execute 1 command eg:[L, R or M]
     * @param {Char} command 
     * @param {Object} roverPosition 
     * @param {Object} plateauCoordinates 
     * @param {Number} directionMax 
     * @param {Number} directionMin 
     * @param {Number} roverCount 
     * @returns {String}
     * @throws {Error}
     */
    executeCommand(command, roverPosition, plateauCoordinates, directionMax, directionMin, roverCount) {
        try {
            let { xAxis, yAxis, direction } = roverPosition;
            const { xAxisMax, yAxisMax, xAxisMin, yAxisMin } = plateauCoordinates;
            let status = true;
            let newDirection = direction;
            switch (command) { /**Commands M[Move]: 1, L[Left turn]: 2, R[Right turn]: 3 */
                case 1:
                    /** Direction 1 -> North, 2 -> East, 3 -> South, 4 -> West */
                    direction === 1 && yAxis < yAxisMax ? (yAxis = yAxis + 1) : direction === 2 && xAxis < xAxisMax ? (xAxis = xAxis + 1) : direction === 3 && yAxis > yAxisMin ? (yAxis = yAxis - 1) : direction === 4 && xAxis > xAxisMin ? (xAxis = xAxis - 1) : (status = false);
                    break;
                case 2: newDirection = direction === directionMin ? directionMax : direction - 1;
                    break;
                case 3: newDirection = direction === directionMax ? directionMin : direction + 1;
                    break;

                default:
                    break;
            }
            if (status) {
                const object = { xAxis, yAxis, direction: newDirection };
                return object;
            } else {
                throw new Error(`Instruction for rover[${roverCount}] cannot be completed. Rover[${roverCount}] cannot cross the plateau, last known position of rover[${roverCount}]`);
            }
        } catch (error) { throw error; }
    }

    getKeyByValue(object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    }
}
const marsRoverCompiler = new MarsRoverCompiler();
module.exports = { marsRoverCompiler }