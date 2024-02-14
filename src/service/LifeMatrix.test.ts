
import { getRandomMatrix } from "../util/random";
import LifeMatrix from "./LifeMatrix";
import lifeGameConfig from "../config/lifeGameConfig.json"

let matrixZero: LifeMatrix;
let matrixOne: LifeMatrix;
const { dimensions } = lifeGameConfig;

beforeEach(() => {
    matrixZero = new LifeMatrix(getRandomMatrix(dimensions, dimensions, 0, 0));
    matrixOne = new LifeMatrix(getRandomMatrix(dimensions, dimensions, 1, 1));
});

//getMatrixPart tests
test("function getMatrixPart start", () => {
    const expected: number[][] = getRandomMatrix(2, 2, 0, 0);
    expected.unshift([0]);
    expect(matrixZero.getMatrixPart(0, 0)).toEqual(expected);
})

test("function getMatrixPart end", () => {
    const expected: number[][] = getRandomMatrix(2, 2, 0, 0);
    expected.push([0]);
    expect(matrixZero.getMatrixPart(dimensions - 1, dimensions - 1)).toEqual(expected);
})

test("function getMatrixPart left", () => {
    const expected: number[][] = getRandomMatrix(3, 2, 0, 0);
    expect(matrixZero.getMatrixPart(Math.trunc(dimensions / 2), 0)).toEqual(expected);
})

test("function getMatrixPart right", () => {
    const expected: number[][] = getRandomMatrix(3, 2, 0, 0);
    expect(matrixZero.getMatrixPart(Math.trunc(dimensions / 2), dimensions - 1)).toEqual(expected);
})

test("function getMatrixPart top", () => {
    const expected: number[][] = getRandomMatrix(2, 3, 0, 0);
    expected.unshift([0]);
    expect(matrixZero.getMatrixPart(0, Math.trunc(dimensions / 2))).toEqual(expected);
})

test("function getMatrixPart bottom", () => {
    const expected: number[][] = getRandomMatrix(2, 3, 0, 0);
    expected.push([0]);
    expect(matrixZero.getMatrixPart(dimensions - 1, Math.trunc(dimensions / 2))).toEqual(expected);
})

test("function getMatrixPart center", () => {
    const expected: number[][] = getRandomMatrix(3, 3, 0, 0);
    expect(matrixZero.getMatrixPart(Math.trunc(dimensions / 2), Math.trunc(dimensions / 2))).toEqual(expected);
})

//getNewCell tests
test("function getNewCell dead cell stay dead (0 neighbours)", () => {
    expect(matrixZero.getNewCell(0, 0)).toEqual(0);
})

test("function getNewCell dead cell stay dead (1 neighbour)", () => {
    matrixZero.numbers[0][1] = 1;
    expect(matrixZero.getNewCell(0, 0)).toEqual(0);
})

test("function getNewCell dead cell stay dead (2 neighbours)", () => {
    matrixZero.numbers[0][1] = 1;
    matrixZero.numbers[0][1] = 1;
    expect(matrixZero.getNewCell(0, 0)).toEqual(0);
})

test("function getNewCell dead cell comes alive (3 neighbours)", () => {
    matrixZero.numbers[0][1] = 1;
    matrixZero.numbers[1][1] = 1;
    matrixZero.numbers[1][0] = 1;
    expect(matrixZero.getNewCell(0, 0)).toEqual(1);
})

test("function getNewCell live cell staying alive (3 neighbours)", () => {
    expect(matrixOne.getNewCell(0, 0)).toEqual(1);
})

test("function getNewCell live cell staying alive (2 neighbours)", () => {
    matrixOne.numbers[0][1] = 0;
    expect(matrixOne.getNewCell(0, 0)).toEqual(1);
})

test("function getNewCell live coming dead (8 neighbours)", () => {
    expect(matrixOne.getNewCell(Math.trunc(dimensions / 2), Math.trunc(dimensions / 2))).toEqual(0);
})

test("function getNewCell live coming dead (4 neighbours)", () => {
    matrixOne.numbers[0][0] = 0;
    expect(matrixOne.getNewCell(0, 1)).toEqual(0);
})


//nextStep tests
test("function nextStep no changes with alive", () => {
    matrixZero.numbers[1][1] = 1;
    matrixZero.numbers[1][2] = 1;
    matrixZero.numbers[2][1] = 1;
    matrixZero.numbers[2][2] = 1;
    const expected = JSON.parse(JSON.stringify(matrixZero.numbers));
    expect(matrixZero.nextStep()).toEqual(expected);
})

test("function nextStep no changes without alive", () => {
    const expected = getRandomMatrix(matrixZero.numbers.length, matrixZero.numbers.length, 0, 0);
    expect(matrixZero.nextStep()).toEqual(expected);
})

test("function nextStep change line", () => {
    const expected = getRandomMatrix(matrixZero.numbers.length, matrixZero.numbers.length, 0, 0);
    matrixZero.numbers[1][0] = 1;
    matrixZero.numbers[1][1] = 1;
    matrixZero.numbers[1][2] = 1;
    expected[0][1] = 1;
    expected[1][1] = 1;
    expected[2][1] = 1;
    expect(matrixZero.nextStep()).toEqual(expected);
})