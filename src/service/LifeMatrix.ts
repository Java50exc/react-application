import { getRandomMatrix } from "../util/random";

export default class LifeMatrix {
    constructor(private _numbers: number[][]) { }
    get numbers() {
        return this._numbers;
    }

    getNeighbours(row: number, column: number): number {
        let count = 0;
        if (row > 0) {
            count += this._numbers[row - 1][column];
            count += this._numbers[row - 1][column - 1] || 0;
            count += this._numbers[row - 1][column + 1] || 0;
        }
        if (row < this._numbers.length - 1) {
            count += this._numbers[row + 1][column] || 0;
            count += this._numbers[row + 1][column + 1] || 0;
            count += this._numbers[row + 1][column - 1] || 0;
        }
        count += this._numbers[row][column - 1] || 0;
        count += this._numbers[row][column + 1] || 0;
        return count;
    }
    nextStep(): number[][] {
        this._numbers = this._numbers.map((row, i) => row.map((cell, j) => {
            const neighbours: number = this.getNeighbours(i, j);
            return neighbours == 3 || (cell === 1 && neighbours === 2) ? 1 : 0;
        }));
        return this._numbers;
    }
}