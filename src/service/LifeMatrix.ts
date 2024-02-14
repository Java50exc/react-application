import { getRandomMatrix } from "../util/random";

export default class LifeMatrix {
    constructor(private _numbers: number[][]) { }
    get numbers() {
        return this._numbers;
    }

    getNeighbours(row: number, column: number): number {
        return (this._numbers[row - 1]?.[column] || 0) + (this._numbers[row - 1]?.[column - 1] || 0) +
            (this._numbers[row - 1]?.[column + 1] || 0) + (this._numbers[row + 1]?.[column] || 0) +
            (this._numbers[row + 1]?.[column + 1] || 0) + (this._numbers[row + 1]?.[column - 1] || 0) +
            (this._numbers[row][column - 1] || 0) + (this._numbers[row][column + 1] || 0);
    }

    nextStep(): number[][] {
        this._numbers = this._numbers.map((row, i) => row.map((cell, j) => {
            const neighbours: number = this.getNeighbours(i, j);
            return neighbours == 3 || (cell === 1 && neighbours === 2) ? 1 : 0;
        }));
        return this._numbers;
    }
}