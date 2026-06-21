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

This section compares the performance and behavior of single-agent search (8-Puzzle) and adversarial search (Tic-Tac-Toe) using both structural reasoning and empirical observations collected during implementation.

---

### 1. Structural Comparison

Although both the 8-Puzzle and Tic-Tac-Toe are represented as state-space search problems, their underlying structures are quite different. The 8-Puzzle is a single-agent problem where only one decision-maker is responsible for reaching a fixed goal configuration. Each move transitions the puzzle closer or further from the goal state, but there is no opposing force influencing the outcome.

In contrast, Tic-Tac-Toe is a two-player adversarial game where each player’s move depends on anticipating the opponent’s response. Instead of searching for a fixed goal state, the objective is to maximize the chance of winning while minimizing the opponent’s advantage. This makes the search tree fundamentally different, as it alternates between maximizing and minimizing layers.

---

### 2. Algorithm Fit

A* search works particularly well for the 8-Puzzle because it uses a heuristic to estimate how far a given state is from the goal. This allows the algorithm to focus on more promising states instead of exploring every possibility blindly. On the other hand, Tic-Tac-Toe does not have a meaningful heuristic that leads toward a single goal state in the same way, since the outcome depends on the opponent’s decisions.

For this reason, Minimax is more suitable for Tic-Tac-Toe because it evaluates all possible moves while assuming optimal play from both sides. Minimax does not apply to the 8-Puzzle because there is no adversarial component that requires reasoning about an opponent.

---

### 3. Empirical Comparison — Module A

Using the standardized test puzzle [[8,1,3],[4,0,2],[7,6,5]], the differences between search strategies became very clear during testing.

Breadth-First Search expanded the largest number of nodes since it explores all states level by level without any guidance. Dijkstra’s algorithm behaved similarly in this case because all moves have equal cost, making it effectively equivalent to BFS in practice.

A*, however, performed significantly better by expanding far fewer nodes. Instead of exploring blindly, it prioritized states that appeared closer to the goal based on the heuristic. This resulted in a much smaller search space and faster solution discovery, typically reducing exploration from thousands of nodes to only tens or low hundreds.

---

### 4. Empirical Comparison — Module B

For the Tic-Tac-Toe module, performance was evaluated using an empty board with AI-first play. The Minimax algorithm explored a large portion of the game tree, since it evaluates all possible moves to ensure optimal decision-making.

When Alpha-Beta pruning was applied, the number of explored nodes decreased significantly. Many branches were cut off early once it became clear they would not affect the final decision. Importantly, this optimization did not change the final result of the game, but it greatly improved efficiency. In practice, pruning removed a large percentage of unnecessary evaluations, especially in deeper parts of the tree.

---

### 5. Trade-off Analysis

Each algorithm in this project comes with different strengths and limitations.

BFS guarantees the shortest path but is inefficient in both time and memory. Dijkstra also guarantees optimality but is unnecessary when all moves have equal cost. A* improves efficiency by using heuristics, making it both optimal and significantly faster in practice.

In the adversarial setting, Minimax guarantees optimal gameplay but becomes computationally expensive as the search tree grows. Alpha-Beta pruning improves upon this by eliminating branches that cannot influence the final decision, reducing computation while preserving correctness.

---

### Conclusion

Overall, the experiments clearly show the importance of optimizing search strategies in AI systems. In the 8-Puzzle, heuristic-based search dramatically improves efficiency compared to uninformed methods. In Tic-Tac-Toe, pruning techniques significantly reduce computation in adversarial decision-making. Across both modules, the project highlights how intelligent pruning and heuristic guidance are essential for making search problems computationally feasible.
