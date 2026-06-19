let minimaxNodes = 0;

function minimax(board, isMaximizing, ai, human) {

    minimaxNodes++;

    const result = evaluateBoard(
        board,
        ai,
        human
    );

    if (result !== null) {
        return result;
    }

    if (isMaximizing) {

        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {

            if (board[i] === "") {

                board[i] = ai;

                let score = minimax(
                    board,
                    false,
                    ai,
                    human
                ).score;

                board[i] = "";

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return { score: bestScore, move: bestMove };
    }

    let bestScore = Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = human;

            let score = minimax(
                board,
                true,
                ai,
                human
            ).score;

            board[i] = "";

            if (score < bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return { score: bestScore, move: bestMove };
}