"use strict"
const assert = require("chai").assert;
var expect = require('chai').expect;
const { marsRoverCompiler } = require("../../services/compiler");

describe("compileInstruction", function () {
    it("Enter rover instructions (L[Left] R[Right] M[Move]): MMRMMRMRRM", function () {
        const command = "MMRMMRMRRM";
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const instructionEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        const roverPosition = { xAxis: 3, yAxis: 3, direction: 2 };
        const plateauCoordinates = { xAxisMax: 5, yAxisMax: 5, xAxisMin: 0, yAxisMin: 0 };
        const directionMax = 4;
        const directionMin = 1;
        const count = 1;
        const output = `ROVER[${count}]: 5 1 E`;
        assert.deepEqual(
            marsRoverCompiler.compileInstruction(roverPosition, command, directionsEnum, instructionEnum, plateauCoordinates, directionMax, directionMin, count),
            output)
    })
    it("Enter rover instructions (L[Left] R[Right] M[Move]): MMRMMRMRRM", function () {
        const command = "MMRMMMM";
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const instructionEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        const roverPosition = { xAxis: 3, yAxis: 3, direction: 2 };
        const plateauCoordinates = { xAxisMax: 5, yAxisMax: 5, xAxisMin: 0, yAxisMin: 0 };
        const directionMax = 4;
        const directionMin = 1;
        const count = 1;
        const output = `ROVER[${count}]: 5 0 S`;
        assert.deepEqual(
            marsRoverCompiler.compileInstruction(roverPosition, command, directionsEnum, instructionEnum, plateauCoordinates, directionMax, directionMin, count),
            output)
    })
})