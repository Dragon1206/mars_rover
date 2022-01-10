"use strict"
const assert = require("chai").assert;
var expect = require('chai').expect;
const { marsRoverProcess } = require("../../services/process");


describe("verifyPlateauSize", function () {
    it("verifying the plateau size (x,y) 5 5", function () {
        const input = "5 5";
        const output = { xAxisMax: 5, yAxisMax: 5, xAxisMin: 0, yAxisMin: 0 };
        assert.deepEqual(marsRoverProcess.verifyPlateauSize(input), output);
    })
    it("verifying the plateau size (x,y) 0 0", function () {
        const input = "0 0";
        const output = "Invalid input: co-ordinates can only be possitive integers greated than 0";
        expect(() => { marsRoverProcess.verifyPlateauSize(input) }).to.throw(output);
    })
    it("verifying the plateau size (x,y) -1 0", function () {
        const input = "-1 0";
        const output = "Invalid input: co-ordinates can only be possitive integers greated than 0";
        expect(() => { marsRoverProcess.verifyPlateauSize(input) }).to.throw(output);
    })
    it("verifying the plateau size (x,y) -1 -1", function () {
        const input = "-1 -1";
        const output = "Invalid input: co-ordinates can only be possitive integers greated than 0";
        expect(() => { marsRoverProcess.verifyPlateauSize(input) }).to.throw(output);
    })
    it("verifying the plateau size (x,y) a 10", function () {
        const input = "a 10";
        const output = "Invalid input: co-ordinates can only be possitive integers greated than 0";
        expect(() => { marsRoverProcess.verifyPlateauSize(input) }).to.throw(output);
    })
    it("verifying the plateau size (x,y) a 10 10", function () {
        const input = "a 10 10";
        const output = "Invalid input: Plateau can only have 2 co-ordinates (x, y)";
        expect(() => { marsRoverProcess.verifyPlateauSize(input) }).to.throw(output);
    })
})



describe("verifyRoverLocation", function () {
    it("Enter Rover location (x y [N(North) E(East) S(South) W(West)]): 5 5 N", function () {
        const input = "5 5 N";
        const plateauCoordinates = { xAxisMax: 5, yAxisMax: 5, xAxisMin: 0, yAxisMin: 0 };
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const output = { xAxis: 5, yAxis: 5, direction: 1 }
        assert.deepEqual(marsRoverProcess.verifyRoverLocation(input, plateauCoordinates, directionsEnum), output);
    })
    it("Enter Rover location (x y [N(North) E(East) S(South) W(West)]): 2 2 N", function () {
        const input = "5 5 N";
        const plateauCoordinates = { xAxisMax: 3, yAxisMax: 1, xAxisMin: 0, yAxisMin: 0 };
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const output = "Invalid input: co-ordinates can be only positive numbers and within bounds";
        expect(() => { marsRoverProcess.verifyRoverLocation(input, plateauCoordinates, directionsEnum) }).to.throw(output);
    })
    it("Enter Rover location (x y [N(North) E(East) S(South) W(West)]): -1 0 N", function () {
        const input = "-1 0 N";
        const plateauCoordinates = { xAxisMax: 3, yAxisMax: 1, xAxisMin: 0, yAxisMin: 0 };
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const output = "Invalid input: co-ordinates can be only positive numbers and within bounds";
        expect(() => { marsRoverProcess.verifyRoverLocation(input, plateauCoordinates, directionsEnum) }).to.throw(output);
    })
    it("Enter Rover location (x y [N(North) E(East) S(South) W(West)]): -1 -1 N", function () {
        const input = "-1 -1 N";
        const plateauCoordinates = { xAxisMax: 3, yAxisMax: 1, xAxisMin: 0, yAxisMin: 0 };
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const output = "Invalid input: co-ordinates can be only positive numbers and within bounds";
        expect(() => { marsRoverProcess.verifyRoverLocation(input, plateauCoordinates, directionsEnum) }).to.throw(output);
    })
    it("Enter Rover location (x y [N(North) E(East) S(South) W(West)]): 1 a N", function () {
        const input = "1 a N";
        const plateauCoordinates = { xAxisMax: 3, yAxisMax: 1, xAxisMin: 0, yAxisMin: 0 };
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const output = "Invalid input: co-ordinates can be only positive numbers and within bounds";
        expect(() => { marsRoverProcess.verifyRoverLocation(input, plateauCoordinates, directionsEnum) }).to.throw(output);
    })
    it("Enter Rover location (x y [N(North) E(East) S(South) W(West)]): 1 1 1 N", function () {
        const input = "1 1 1 N";
        const plateauCoordinates = { xAxisMax: 3, yAxisMax: 1, xAxisMin: 0, yAxisMin: 0 };
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const output = "Invalid input: Rover location coordinates incorrect (x, y, direction [N or E or S or W])";
        expect(() => { marsRoverProcess.verifyRoverLocation(input, plateauCoordinates, directionsEnum) }).to.throw(output);
    })
    it("Enter Rover location (x y [N(North) E(East) S(South) W(West)]): 6 -1  N", function () {
        const input = "6 -1  N";
        const plateauCoordinates = { xAxisMax: 3, yAxisMax: 1, xAxisMin: 0, yAxisMin: 0 };
        const directionsEnum = Object.freeze({ N: 1, E: 2, S: 3, W: 4 });
        const output = "Invalid input: Rover location coordinates incorrect (x, y, direction [N or E or S or W])";
        expect(() => { marsRoverProcess.verifyRoverLocation(input, plateauCoordinates, directionsEnum) }).to.throw(output);
    })
})

describe("verifyRoverInstruction", function () {
    it("Enter rover instructions (L[Left] R[Right] M[Move]): LLLMMMR   ", function () {
        const input = "LLLMMMR";
        const instructionRegex = '^[MLR]+$';
        const instructionEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        const output = "LLLMMMR"
        assert.deepEqual(marsRoverProcess.verifyRoverInstruction(input, instructionRegex, instructionEnum), output);
    })
    it("Enter rover instructions (L[Left] R[Right] M[Move]): LLLMMMF", function () {
        const input = "LLLMMMF";
        const instructionRegex = "^[MLR]+$";
        const instructionEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        const values = Object.keys(instructionEnum).toString();
        const output = `Invalid input: accepted inputs [${values}]`;
        expect(() => { marsRoverProcess.verifyRoverInstruction(input, instructionRegex, instructionEnum) }).to.throw(output);
    })
    it("Enter rover instructions (L[Left] R[Right] M[Move]): LLLMRRMM  ", function () {
        const input = "LLLMRRMM  ";
        const instructionRegex = "^[MLR]+$";
        const instructionEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        const values = Object.keys(instructionEnum).toString();
        const output = `Invalid input: accepted inputs [${values}]`;
        expect(() => { marsRoverProcess.verifyRoverInstruction(input, instructionRegex, instructionEnum) }).to.throw(output);
    })
    it("Enter rover instructions (L[Left] R[Right] M[Move]): LLLMRR1MM", function () {
        const input = "LLLMRR1MM";
        const instructionRegex = "^[MLR]+$";
        const instructionEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        const values = Object.keys(instructionEnum).toString();
        const output = `Invalid input: accepted inputs [${values}]`;
        expect(() => { marsRoverProcess.verifyRoverInstruction(input, instructionRegex, instructionEnum) }).to.throw(output);
    })
    it("Enter rover instructions (L[Left] R[Right] M[Move]): LLLMRR@MM", function () {
        const input = "LLLMRR@MM";
        const instructionRegex = "^[MLR]+$";
        const instructionEnum = Object.freeze({ M: 1, L: 2, R: 3 });
        const values = Object.keys(instructionEnum).toString();
        const output = `Invalid input: accepted inputs [${values}]`;
        expect(() => { marsRoverProcess.verifyRoverInstruction(input, instructionRegex, instructionEnum) }).to.throw(output);
    })
})