import { useState } from 'react';

type Player = 'X' | 'O';
type Cell = Player | null;

const SIZE = 3;

const checkWinner = (board: Cell[]): Player | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  
  return null;
};

const useTicTacToe = () => {
  const [board, setBoard] = useState<Cell[]>(Array(SIZE * SIZE).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);

  const isGameOver = winner !== null || board.every(cell => cell !== null);

  const handleClick = (index: number) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(SIZE * SIZE).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return {
    board,
    currentPlayer,
    winner,
    isGameOver,
    handleClick,
    resetGame,
  };
};

export default useTicTacToe;
