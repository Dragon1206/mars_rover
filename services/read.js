"use strict";

class MarsRoverRead {
    /**
     * @method getPlateauSize
     * @description This method gets the plateau (x, y) coordinates from the user 
     * @param {Object} prompt 
     * @returns {Promise}
     * @throws {Promis}
     */
    getPlateauSize(prompt) {
        return new Promise((resolve, reject) => {
            try {
                prompt.question("Enter the plateau size (x y): ", (coordinates) => {
                    resolve(coordinates);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @method getRoverLocation
     * @description This method gets the mars rover location (x, y, [N,E,S,W]) from the user 
     * @param {Object} prompt 
     * @param {Number} roverCount
     * @returns {Promise}
     * @throws {Promis}
     */
    getRoverLocation(prompt, roverCount) {
        return new Promise((resolve, reject) => {
            try {
                prompt.question(`Enter Rover[${roverCount}] location (x y [N(North) E(East) S(South) W(West)]): `, (roverCoordinates) => {
                    resolve(roverCoordinates);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * @method getRoverInstruction
     * @description This method gets the instructions the rover has to perform (L, R, M) from the user 
     * @param {Object} prompt 
     * @param {Number} roverCount
     * @returns {Promise}
     * @throws {Promis}
     */
    getRoverInstruction(prompt, roverCount) {
        return new Promise((resolve, reject) => {
            try {
                prompt.question(`Enter rover[${roverCount}] instructions (L[Left] R[Right] M[Move]): `, (roverInstruction) => {
                    resolve(roverInstruction);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

const marsRoverRead = new MarsRoverRead();
module.exports = {
    marsRoverRead
};
