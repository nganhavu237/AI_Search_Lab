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

In this project, I compared how two different types of AI problems behave: single-agent search in the 8-Puzzle and adversarial search in Tic-Tac-Toe. Even though both use state-space search, they feel quite different when you actually implement and test them.

---

### 1. Structural Comparison

The 8-Puzzle is a single-player problem, so there is no opponent. The goal is just to reach the correct final arrangement starting from a scrambled board. Every move depends only on the current state and how close it is to the goal.

Tic-Tac-Toe is very different because it has two players. Every move depends on what the other player might do next. Instead of just reaching a goal state, the goal is to win or prevent the opponent from winning. So the search space is more like a back-and-forth decision tree.

---

### 2. Algorithm Fit

A* works well for the 8-Puzzle because it has a clear goal and a heuristic (like Manhattan distance) that helps estimate how far a state is from the solution. This makes the search more focused and efficient.

Tic-Tac-Toe does not really use heuristics in the same way because there is no single “distance to goal.” Instead, Minimax is better because it checks all possible moves and assumes the opponent is also playing optimally. That’s why Minimax fits games, but not really puzzles like the 8-Puzzle.

---

### 3. Empirical Comparison — Module A

For the test puzzle [[8,1,3],[4,0,2],[7,6,5]], I noticed a big difference between the algorithms.

BFS explored a lot of states because it checks everything level by level without any direction. Dijkstra was almost the same since all moves have equal cost.

A* was much faster and explored far fewer nodes because it uses the heuristic to focus only on better paths. Instead of searching blindly, it kind of “guesses” which direction is closer to the solution, which saves a lot of work.

---

### 4. Empirical Comparison — Module B

For Tic-Tac-Toe, Minimax looked at almost every possible move on the board, so it explored a large number of game states.

When I used Alpha-Beta pruning, it skipped many branches that were clearly not useful. This made it faster, but it still gave the same final result. So pruning didn’t change the decision, it just reduced unnecessary calculations.

---

### 5. Trade-off Analysis

Each algorithm has its own pros and cons.

BFS is simple and always finds the shortest path, but it is slow and uses a lot of memory. Dijkstra is similar but not really needed here since all moves cost the same.

A* is the most efficient for the puzzle because it uses a heuristic to guide the search.

For games, Minimax is accurate but can be slow because it checks everything. Alpha-Beta improves it by cutting off branches that don’t matter, which makes it faster without changing the result.

---

### Conclusion

Overall, I noticed that heuristics make a huge difference in search problems like the 8-Puzzle, while pruning is more useful in game situations like Tic-Tac-Toe. Both techniques help reduce unnecessary work, but they are used in different ways depending on the problem type.
