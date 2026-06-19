let board;
let currentPlayer;
let humanPlayer;
let aiPlayer;
let gameOver = false;

let decisionTime = 0;
let solutionLength = 0;
let minimaxCount = 0;

const statusDiv = document.getElementById("status");
const boardDiv = document.getElementById("board");
const nodeSpan = document.getElementById("nodes");
const timeSpan = document.getElementById("time");
const solutionSpan = document.getElementById("solutionLength");
const pruningSpan = document.getElementById("pruning");

function updateControls() {
    const mode = document.getElementById("gameMode").value;

    const algorithmControl = document.getElementById("algorithmControl");
    const playerControl = document.getElementById("playerControl");
    const aiXControl = document.getElementById("aiXControl");
    const aiOControl = document.getElementById("aiOControl");

    if (mode === "ai") {
        algorithmControl.style.display = "none";
        playerControl.style.display = "none";
        aiXControl.style.display = "flex";
        aiOControl.style.display = "flex";
    } else {
        algorithmControl.style.display = "flex";
        playerControl.style.display = "flex";
        aiXControl.style.display = "none";
        aiOControl.style.display = "none";
    }
}

function startGame() {
    board = ["","","","","","","","",""];
    gameOver = false;

    solutionLength = 0;
    timeSpan.textContent = "0";
    nodeSpan.textContent = "0";
    solutionSpan.textContent = "0";
    pruningSpan.textContent = "N/A";

    renderBoard();

    const mode = document.getElementById("gameMode").value;

    if (mode === "human") {

        humanPlayer =
            document.getElementById("playerSymbol").value;

        aiPlayer =
            humanPlayer === "X" ? "O" : "X";

        currentPlayer = "X";

        if (aiPlayer === "X") {
            setTimeout(aiMove, 500);
        }

    } else {

        currentPlayer = "X";
        setTimeout(aiVsAiMove, 500);
    }
}

function renderBoard() {
    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        const div = document.createElement("div");

        div.classList.add("cell");
        div.textContent = cell;

        div.addEventListener(
            "click",
            () => humanMove(index)
        );

        boardDiv.appendChild(div);
    });
}

function humanMove(index) {

    if (gameOver) return;
    if (board[index] !== "") return;
    if (currentPlayer !== humanPlayer) return;

    board[index] = humanPlayer;

    renderBoard();

    if (finishGame()) return;

    currentPlayer = aiPlayer;

    setTimeout(aiMove, 500);
}

function aiMove() {

    if (gameOver) return;

    let result;

    const algo =
        document.getElementById("algorithm").value;

    let start = performance.now();

    if (algo === "minimax") {

        minimaxNodes = 0;

        result = minimax(
            [...board],
            true,
            aiPlayer,
            humanPlayer
        );

        nodeSpan.textContent = minimaxNodes;

        minimaxCount = minimaxNodes;

        pruningSpan.textContent = "N/A";

    } else {

          alphaBetaNodes = 0;

          result = alphaBeta(
              [...board],
              0,
              -Infinity,
              Infinity,
              true,
              aiPlayer,
              humanPlayer
          );

          nodeSpan.textContent = alphaBetaNodes;


          // Run plain Minimax for comparison
          minimaxNodes = 0;

          minimax(
              [...board],
              true,
              aiPlayer,
              humanPlayer
          );

          minimaxCount = minimaxNodes;


          const efficiency =
              ((minimaxCount - alphaBetaNodes)
              / minimaxCount) * 100;


          pruningSpan.textContent =
              efficiency.toFixed(2) + "%";
      }

    decisionTime =
        performance.now() - start;

    timeSpan.textContent =
        decisionTime.toFixed(3);


    board[result.move] = aiPlayer;

    renderBoard();

    if (finishGame()) return;

    currentPlayer = humanPlayer;
}

async function aiVsAiMove() {

    while (!gameOver) {

        let result;

        const aiX =
            document.getElementById("aiX").value;

        const aiO =
            document.getElementById("aiO").value;

        let start = performance.now();

        let algorithmUsed;
        let ai;
        let opponent;


        if (currentPlayer === "X") {

            algorithmUsed = aiX;
            ai = "X";
            opponent = "O";

        } else {

            algorithmUsed = aiO;
            ai = "O";
            opponent = "X";
        }


        if (algorithmUsed === "minimax") {

            minimaxNodes = 0;

            result = minimax(
                [...board],
                true,
                ai,
                opponent
            );

            nodeSpan.textContent =
                minimaxNodes;

            pruningSpan.textContent = "N/A";

        } else {

            alphaBetaNodes = 0;

            result = alphaBeta(
                [...board],
                0,
                -Infinity,
                Infinity,
                true,
                ai,
                opponent
            );

            nodeSpan.textContent =
                alphaBetaNodes;


            // Calculate pruning efficiency
            minimaxNodes = 0;

            minimax(
                [...board],
                true,
                ai,
                opponent
            );

            const efficiency =
                ((minimaxNodes - alphaBetaNodes)
                / minimaxNodes) * 100;


            pruningSpan.textContent =
                efficiency.toFixed(2) + "%";
        }


        decisionTime =
            performance.now() - start;


        timeSpan.textContent =
            decisionTime.toFixed(3);



        board[result.move] =
            currentPlayer;


        renderBoard();


        if (finishGame()) {
            return;
        }


        currentPlayer =
            currentPlayer === "X"
            ? "O"
            : "X";


        await sleep(700);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function finishGame() {

    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let combo of wins) {

        const [a,b,c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            statusDiv.textContent =
                board[a] + " Wins!";

            solutionLength =
                board.filter(
                    cell => cell !== ""
                ).length;

            solutionSpan.textContent =
                solutionLength;

            gameOver = true;

            return true;
        }
    }

    if (!board.includes("")) {

        statusDiv.textContent = "Draw";

        solutionLength =
            board.filter(
                cell => cell !== ""
            ).length;

        solutionSpan.textContent =
            solutionLength;

        gameOver = true;

        return true;
    }

    statusDiv.textContent =
        "Current Turn: " + currentPlayer;

    return false;
}

function evaluateBoard(board, ai, human) {

    const wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let combo of wins) {

        const [a,b,c] = combo;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {

            if (board[a] === ai) {
                return {score:10};
            }

            if (board[a] === human) {
                return {score:-10};
            }
        }
    }

    if (!board.includes("")) {
        return {score:0};
    }

    return null;
}