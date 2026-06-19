function manhattan(state) {
    let dist = 0;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {

            let val = state[r][c];
            if (val === 0) continue;

            let gr = Math.floor((val - 1) / 3);
            let gc = (val - 1) % 3;

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

            let nextKey = stateToString(next);

            if (!visited.has(nextKey)) {
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