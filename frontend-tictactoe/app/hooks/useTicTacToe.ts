import { useState, useEffect } from 'react';

// Define the Tic-Tac-Toe board size
const SIZE = 3;

const useTicTacToe = () => {
  // State to keep track of the game board, which is an array of size SIZE * SIZE, initially filled with null values
  const [board, setBoard] = useState<(string | null)[]>(Array(SIZE * SIZE).fill(null));

  // State to keep track of the current player ('X' or 'O')
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');

  // State to store the winner of the game or null if there's no winner yet; could also be 'Draw' if it's a draw
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null);

  // State to track if the game is over (either a player has won or it's a draw)
  const [isGameOver, setIsGameOver] = useState(false);

  // Effect hook that triggers a computer move if the current player is 'O' and the game is not over
  useEffect(() => {
    if (currentPlayer === 'O' && !isGameOver) {
      makeComputerMove();
    }
  }, [currentPlayer, isGameOver]);

  // Function to check for a winner or a draw
  const checkWinner = (board: (string | null)[]): 'X' | 'O' | 'Draw' | null => {
    // Define winning combinations (rows, columns, and diagonals)
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    // Check if any of the winning combinations have the same player
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as 'X' | 'O'; // Return the winner ('X' or 'O')
      }
    }
    
    // If all cells are filled and no winner is found, it's a draw
    return board.every(cell => cell) ? 'Draw' : null;
  };

  // Function to handle a click on a board cell
  const handleClick = (index: number) => {
    // Ignore click if the cell is already filled or if the game is over
    if (board[index] || isGameOver) return;

    // Create a copy of the board to update the clicked cell
    const newBoard = board.slice();
    newBoard[index] = currentPlayer; // Update the board with the current player's move
    setBoard(newBoard);

    // Check the new board state for a winner
    const gameResult = checkWinner(newBoard);

    if (gameResult) {
      // If there's a winner or it's a draw, update the game state
      setWinner(gameResult);
      setIsGameOver(true);
    } else {
      // Switch to the other player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Function to make a move for the computer
  const makeComputerMove = () => {
    // Find all empty cell indices
    let emptyIndices = board.map((cell, index) => (cell === null ? index : null)).filter(index => index !== null) as number[];
    
    if (emptyIndices.length === 0) return; // No empty cells available

    // Randomly select one of the empty cells
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    handleClick(randomIndex); // Make a move at the selected index
  };

  // Function to reset the game to its initial state
  const resetGame = () => {
    setBoard(Array(SIZE * SIZE).fill(null)); // Clear the board
    setCurrentPlayer('X'); // Reset the current player to 'X'
    setWinner(null); // Clear the winner state
    setIsGameOver(false); // Reset the game over state
  };

  // Return the game state and functions to interact with the game
  return { board, currentPlayer, winner, isGameOver, handleClick, resetGame };
};

export default useTicTacToe;
