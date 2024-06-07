import { BoardCLASS } from "./Board";
import { Max } from "./Const";

BoardCLASS.prototype.SearchCapture = function (color, alpha, beta) {
    const firstEval = this.Eval(color)
    if (firstEval >= beta) return beta;
    alpha = Max(firstEval, alpha);
    const moves = this.GeneratorCapture(color);
    for (const move of moves) {
        this.MakeMove(move);
        const evaluation = -this.SearchCapture(+!color, -beta, -alpha);
        this.UnMakeMove();
        if (evaluation >= beta) return beta;
        alpha = Max(evaluation, alpha);
    }
    return alpha;
};
