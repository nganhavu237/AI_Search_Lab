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
            return { path, nodesExpanded, cost: path.length - 1 };
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