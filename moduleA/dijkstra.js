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
            let nextKey = stateToString(next);

            if (!visited.has(nextKey)) {
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