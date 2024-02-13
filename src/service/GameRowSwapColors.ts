import GameRowSimpleColors from "./GameRowSimpleColors";
import  {CellType} from "../model/CellType";


export default class GameRowSwapColors extends GameRowSimpleColors {
    count: number = 0;
    firstIndex:number = -1;

    constructor(nCells: number) {
        super(nCells);
    }

    isOver(): boolean {
        return this.count === Math.trunc(this.row.length / 2);
    }

    move(id: number): string | CellType[] {
        let res: string | CellType[];
        this.count++;

        if (this.isOver()) {
            res = "game is over";
        } else if (this.firstIndex === -1) {
            this.firstIndex = id;
            res = this.row;
        } else {
            let t = JSON.parse(JSON.stringify(this.row)) as CellType[];
            [t[id].cellColor, t[this.firstIndex].cellColor] = [t[this.firstIndex].cellColor, t[id].cellColor];
            this.row = t;
            this.firstIndex = -1;
            res = t;
        }
        return res;
    }
}