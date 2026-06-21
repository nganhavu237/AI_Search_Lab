# AI Search Lab

## Overview

AI Search Lab is an interactive web-based project that demonstrates core Artificial Intelligence concepts through search algorithms and adversarial game playing.

The project includes two main modules:
- **Module A: 8-Puzzle Solver (Single-Agent Search)**
- **Module B: Tic-Tac-Toe AI (Adversarial Search)**

These modules showcase how AI can solve structured problems and make intelligent decisions in competitive environments.

---

## Module A: 8-Puzzle Solver

This module solves the classic 8-puzzle problem using multiple search algorithms.

### Algorithms Implemented:
- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Dijkstra’s Algorithm
- A* Search Algorithm

### Description:
The goal is to transform a scrambled 3x3 puzzle into the correct order using the least number of moves. Different algorithms are used to compare efficiency and optimality.

### Learning Outcome:
- Understanding uninformed vs informed search
- Importance of heuristics (A*)
- Pathfinding and state-space exploration

---

## Module B: Tic-Tac-Toe AI

This module implements an AI opponent for the classic Tic-Tac-Toe game.

### Algorithms Implemented:
- Minimax Algorithm
- Alpha-Beta Pruning Optimization

### Description:
The AI evaluates all possible moves and selects the optimal one to either win or prevent losing against the player.

### Learning Outcome:
- Game theory basics
- Adversarial decision-making
- Optimization using pruning techniques

---

## Key AI Concepts Used

- State-space search
- Heuristic evaluation
- Optimal pathfinding
- Adversarial search
- Decision trees

---

## Technologies Used

- HTML
- CSS
- JavaScript

---

## How to Run the Project

1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. Use the landing page to navigate:
   - Module A → 8-Puzzle Solver
   - Module B → Tic-Tac-Toe AI

No additional setup required.

---

## Project Goals

- Demonstrate AI search strategies in a visual way
- Compare multiple search algorithms
- Implement game-playing AI using Minimax
- Provide interactive learning experience

---

## What We Learned

- How AI explores problem spaces using search algorithms
- Differences between BFS, DFS, Dijkstra, and A*
- How adversarial AI makes decisions using Minimax
- How pruning improves efficiency (Alpha-Beta Pruning)
- Structuring a multi-module AI project in JavaScript

---

## Authors

- Safina Thapa — Module A (8-Puzzle Solver)
- Ngan Ha Vu — Module B (Tic-Tac-Toe AI)

---

## Status

Project completed and fully functional.


## Comparative Analysis

This section compares single-agent search (8-Puzzle) and adversarial search (Tic-Tac-Toe) using empirical and structural analysis.

---

### 1. Structural Comparison

The 8-Puzzle and Tic-Tac-Toe both use state-space search, but their structures differ fundamentally. The 8-Puzzle is a single-agent problem where the system explores states toward a goal configuration without opposition. In contrast, Tic-Tac-Toe is a two-player adversarial game where each move depends on an opponent’s strategy. In the 8-Puzzle, the objective is to reach a fixed goal state, while in Tic-Tac-Toe, the objective is to maximize utility against an opponent who actively minimizes it.

---

### 2. Algorithm Fit

A* is appropriate for the 8-Puzzle because it uses a heuristic to estimate distance to the goal, guiding search efficiently. Tic-Tac-Toe, however, does not have a heuristic path to a single goal state; instead, it requires evaluating opponent moves, making Minimax more suitable. Minimax is not applicable to the 8-Puzzle because there is no adversarial agent influencing transitions.

---

### 3. Empirical Comparison — Module A

Using the test puzzle [[8,1,3],[4,0,2],[7,6,5]]:

- BFS expanded: ~thousands of nodes
- Dijkstra expanded: similar to BFS due to uniform cost
- A* expanded: significantly fewer nodes (tens to low hundreds)

These results show that heuristic guidance dramatically reduces search space size. A* achieves efficiency by prioritizing promising states instead of exploring blindly.

---

### 4. Empirical Comparison — Module B

On an empty Tic-Tac-Toe board:

- Minimax explored: full game tree (hundreds of nodes)
- Alpha-Beta Pruning reduced exploration significantly
- Observed pruning efficiency: high reduction in unnecessary branches

This demonstrates that pruning removes redundant evaluations while preserving optimal decisions.

---

### 5. Trade-off Analysis

- BFS: complete but inefficient; guarantees shortest path but uses high memory.
- Dijkstra: complete and optimal but unnecessary for equal-cost moves.
- A*: optimal and efficient due to heuristic guidance.
- Minimax: complete but computationally expensive.
- Alpha-Beta: same result as Minimax but more efficient due to pruning.

---

### Conclusion

Heuristic-based search significantly improves performance in structured problems like the 8-Puzzle, while pruning techniques optimize adversarial decision-making in games like Tic-Tac-Toe. The experiments demonstrate how AI performance depends heavily on reducing unnecessary exploration in large search spaces.
