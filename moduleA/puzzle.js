const GOAL_STATE = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
];

let startState = [
    [8, 1, 3],
    [4, 0, 2],
    [7, 6, 5]
];

// =========================
// HELPERS
// =========================
function stateToString(state) {
    return state.flat().join(",");
}

function isGoal(state) {
    return stateToString(state) === stateToString(GOAL_STATE);
}

function findBlank(state) {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (state[r][c] === 0) return [r, c];
        }
    }
    return null;
}

function clone(state) {
    return state.map(r => [...r]);
}

// =========================
// NEIGHBORS
// =========================
function getNeighbors(state) {
    const [r, c] = findBlank(state);

    const dirs = [
        [-1,0],[1,0],[0,-1],[0,1]
    ];

    let result = [];

    for (let [dr, dc] of dirs) {
        let nr = r + dr;
        let nc = c + dc;

        if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3) {
            let newState = clone(state);

            [newState[r][c], newState[nr][nc]] =
            [newState[nr][nc], newState[r][c]];

            result.push(newState);
        }
    }

    return result;
}

// =========================
// RENDER PUZZLE
// =========================
function renderPuzzle(state) {

    let html = "<table>";

    for (let r = 0; r < 3; r++) {
        html += "<tr>";

        for (let c = 0; c < 3; c++) {

            let val = state[r][c];

            html += `
                <td onclick="moveTile(${r},${c})">
                    ${val === 0 ? "" : val}
                </td>
            `;
        }

        html += "</tr>";
    }

    html += "</table>";

    document.getElementById("puzzle").innerHTML = html;
}

// =========================
// MANUAL MOVE
// =========================
function moveTile(r, c) {

    let [br, bc] = findBlank(startState);

    if (Math.abs(r - br) + Math.abs(c - bc) !== 1) return;

    [startState[r][c], startState[br][bc]] =
    [startState[br][bc], startState[r][c]];

    renderPuzzle(startState);

    if (isGoal(startState)) {
        alert("Solved!");
    }
}

// =========================
// DASHBOARD
// =========================
function updateDashboard(name, result, time) {

    document.getElementById("algorithm").textContent = name;
    document.getElementById("nodes").textContent = result.nodesExpanded;
    document.getElementById("length").textContent = result.cost;
    document.getElementById("time").textContent = time + " ms";
}

// =========================
// ANIMATION
// =========================
function animateSolution(path) {

    let i = 0;

    let interval = setInterval(() => {

        if (i >= path.length) {
            clearInterval(interval);
            return;
        }

        startState = path[i].map(r => [...r]);
        renderPuzzle(startState);

        i++;

    }, 400);
}

// =========================
// SHUFFLE
// =========================
function shufflePuzzle() {

    let state = [
        [1,2,3],
        [4,5,6],
        [7,8,0]
    ];

    for (let i = 0; i < 50; i++) {
        let neighbors = getNeighbors(state);
        state = neighbors[Math.floor(Math.random() * neighbors.length)];
    }

    startState = state;
    renderPuzzle(startState);
}

// =========================
// RUN BFS
// =========================
function bfs(startState) {

    let queue = [{
        state: startState,
        path: [startState]
    }];

    let visited = new Set();
    visited.add(stateToString(startState));

    let nodesExpanded = 0;

    while (queue.length) {

        let { state, path } = queue.shift();
        nodesExpanded++;

        if (isGoal(state)) {
            return {
                path,
                nodesExpanded,
                cost: path.length - 1
            };
        }

        for (let next of getNeighbors(state)) {
            let key = stateToString(next);

            if (!visited.has(key)) {
                visited.add(key);

                queue.push({
                    state: next,
                    path: [...path, next]
                });
            }
        }
    }

    return null;
}

// =========================
// DIJKSTRA
// =========================
function dijkstra(startState) {

    let pq = [{
        state: startState,
        path: [startState],
        cost: 0
    }];

    let visited = new Set();
    let nodesExpanded = 0;

    while (pq.length) {

        pq.sort((a,b) => a.cost - b.cost);

        let { state, path, cost } = pq.shift();
        nodesExpanded++;

        if (isGoal(state)) {
            return { path, nodesExpanded, cost };
        }

        let key = stateToString(state);
        if (visited.has(key)) continue;
        visited.add(key);

        for (let next of getNeighbors(state)) {

            let k = stateToString(next);

            if (!visited.has(k)) {
                pq.push({
                    state: next,
                    path: [...path, next],
                    cost: cost + 1
                });
            }
        }
    }

    return null;
}

// =========================
// ASTAR
// =========================
function manhattan(state) {

    let dist = 0;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {

            let v = state[r][c];
            if (v === 0) continue;

            let gr = Math.floor((v - 1) / 3);
            let gc = (v - 1) % 3;

            dist += Math.abs(r - gr) + Math.abs(c - gc);
        }
    }

    return dist;
}

function astar(startState) {

    let open = [{
        state: startState,
        path: [startState],
        g: 0,
        h: manhattan(startState)
    }];

    let visited = new Set();
    let nodesExpanded = 0;

    while (open.length) {

        open.sort((a,b) => (a.g + a.h) - (b.g + b.h));

        let { state, path, g } = open.shift();
        nodesExpanded++;

        if (isGoal(state)) {
            return { path, nodesExpanded, cost: g };
        }

        let key = stateToString(state);
        if (visited.has(key)) continue;
        visited.add(key);

        for (let next of getNeighbors(state)) {

            let k = stateToString(next);

            if (!visited.has(k)) {
                open.push({
                    state: next,
                    path: [...path, next],
                    g: g + 1,
                    h: manhattan(next)
                });
            }
        }
    }

    return null;
}

// =========================
// RUN FUNCTIONS
// =========================
function runBFS() {
    let t = performance.now();
    let res = bfs(startState);
    let t2 = performance.now();

    updateDashboard("BFS", res, (t2 - t).toFixed(2));
    animateSolution(res.path);
}

function runDijkstra() {
    let t = performance.now();
    let res = dijkstra(startState);
    let t2 = performance.now();

    updateDashboard("Dijkstra", res, (t2 - t).toFixed(2));
    animateSolution(res.path);
}

function runAStar() {
    let t = performance.now();
    let res = astar(startState);
    let t2 = performance.now();

    updateDashboard("A*", res, (t2 - t).toFixed(2));
    animateSolution(res.path);
}

// INIT
renderPuzzle(startState);