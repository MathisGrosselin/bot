import { BoardCLASS } from "./Board";
import { Max } from "./Const";

BoardCLASS.prototype.Search = function (depth, color, alpha, beta) {
    //repetition
    if (this.VerifRep()) return 0;
    //endSearch for Captures Moves
    if (depth === 0) return this.SearchCapture(color, alpha, beta);
    //get Moves
    const moves = this.GeneratorMove(color);
    for (const move of moves) {
            this.MakeMove(move);
            let evaluation = -this.Search(depth - 1, +!color, -beta, -alpha);
            if (move.p) evaluation -= depth;
            this.UnMakeMove();
            if (evaluation >= beta) return beta;
            alpha = Max(evaluation, alpha);
    }
    // no moves
    if (moves.length === 0) {
        // check Mate
        if (this.isSquareInCheck(this.coordKings[color], color)) return -100000 - depth * 1000;
        // PAT
        return 0;
    }
    return alpha;
};
