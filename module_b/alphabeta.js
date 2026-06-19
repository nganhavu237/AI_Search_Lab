let alphaBetaNodes = 0;
let prunedNodes = 0;

function alphaBeta(
    board,
    depth,
    alpha,
    beta,
    isMaximizing,
    ai,
    human
) {
    alphaBetaNodes++;

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

                let score = alphaBeta(
                    board,
                    depth + 1,
                    alpha,
                    beta,
                    false,
                    ai,
                    human
                ).score;

                board[i] = "";

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }

                alpha = Math.max(alpha, score);

                if (beta <= alpha) {
                    prunedNodes++;
                    break;
                }
            }
        }

        return {
            score: bestScore,
            move: bestMove
        };
    }


    let bestScore = Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = human;

            let score = alphaBeta(
                board,
                depth + 1,
                alpha,
                beta,
                true,
                ai,
                human
            ).score;

            board[i] = "";


            if (score < bestScore) {
                bestScore = score;
                bestMove = i;
            }

            beta = Math.min(beta, score);


            if (beta <= alpha) {
                prunedNodes++;
                break;
            }
        }
    }


    return {
        score: bestScore,
        move: bestMove
    };
}