import { BoardCLASS } from "./Board";
import { Best, Max } from "./Const";

BoardCLASS.prototype.Start = function (color, depth) {
    let alpha = -Infinity;
    let response = [];
    this.already = []
    if (!this.gameValue && this.ScoreColorForEndGame(+!color) < 1300) this.gameValue = 1;
    const moves = this.GeneratorMove(color)
    for (const move of moves) {
        this.MakeMove(move);
        const evaluation = -this.Search(depth, +!color, alpha, +Infinity)
        this.UnMakeMove();
        response.push([move, evaluation]);
        console.log(evaluation);
        alpha = Max(alpha, evaluation);
    }
    console.log("-------------------------------");
    let r = [];
    for (const [move, score] of response) if (score === alpha) r.push(move);
    return r[Math.floor(Math.random() * r.length)];
};
