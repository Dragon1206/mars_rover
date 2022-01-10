"use strict";
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, ".env")
});
const { marsRoverController } = require("./controller/controller");
const readline = require("readline");

init();

async function init() {
    try {
        const prompt = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
        /**Environment Variables which configure number of mars rovers*/
        const roverCount = parseInt(process.env.ROVER_COUNT) > 0 ? parseInt(process.env.ROVER_COUNT) : undefined;
        /**Regex for validating commands */
        const commandRegex = "^[MLR]+$";
        /**Commands supported by the system */
        const commandsEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        /**[Directions should be in clockwise order and numerically increasing]*/
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        if (roverCount !== undefined) {
            await marsRoverController.execute(prompt, commandRegex, commandsEnum, directionsEnum, roverCount);
        } else {
            console.error("roverCount can only accept non-zero positive integer. Please update the environment variable");
        }
    } catch (error) { console.error(error); }
}
