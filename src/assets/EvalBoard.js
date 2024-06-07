import { BoardCLASS } from "./Board";
import { Distance, isPawn, isRock, kingCenter, kingSquares, pieV, posV } from "./Const";

BoardCLASS.prototype.Eval = function (c) {
    let r = 0;
    const state = this.gameValue;
    let pawn = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let rock = [
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
    ];
    for (let square = 0; square < 64; square++) {
        const piece = this.board[square];
        const x = piece % 8;
        if (piece) {
            if (isPawn(piece)) pawn[piece % 2][x]++;
            if (isRock(piece)) rock[piece % 2][x] = true;
            const typePiece = parseInt((piece - 1) / 2);
            if (piece % 2) r -= posV[typePiece][state][(7 - parseInt(square / 8)) * 8 + x] + pieV[typePiece];
            else r += posV[typePiece][state][square] + pieV[typePiece];
        }
    }
    for (let j = 0; j < 8; j++) {
        const n1 = pawn[0][j];
        const n2 = pawn[1][j];
        if (n1 >= 2) r -= 60;
        if (n2 >= 2) r += 60;
        if (rock[0][j] && !n1) r += 10;
        if (rock[1][j] && !n2) r -= 10;
        if (rock[0][j] && !n1 && !n2) r += 20;
        if (rock[1][j] && !n1 && !n2) r -= 20;
    }
    if (state === 1) {
        const [w, b] = this.coordKings;
        if (c === 1 && r < 100) r -= kingCenter[w] * 2  + 100 - parseInt(Distance(w, b) * 10);
        if (c === 0 && r > 100) r += kingCenter[b] * 2  + 100 - parseInt(Distance(w, b) * 10);
    }
    if (c) return -r;
    return r;
};
