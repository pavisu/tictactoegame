import { useState, useEffect } from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';

const SIZE = 3;
const BACKEND_URL = 'http://localhost:8080/api/games';

const useTicTacToe = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(SIZE * SIZE).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (currentPlayer === 'O' && !isGameOver) {
      makeComputerMove();
    }
  }, [currentPlayer, isGameOver]);

  useEffect(() => {
    if (id) {
      const interval = setInterval(() => {
        axios.get(`${BACKEND_URL}/${id}`).then(response => {
          const game = response.data;
          setBoard(game.board.flat());
          setCurrentPlayer(game.currentPlayer);
          setWinner(game.status === 'Draw' ? 'Draw' : game.status === 'In Progress' ? null : game.status);
          setIsGameOver(game.status !== 'In Progress');
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [id]);

  const checkWinner = (board: (string | null)[]): 'X' | 'O' | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as 'X' | 'O';
      }
    }

    return board.every(cell => cell) ? 'Draw' : null;
  };

  const handleClick = async (index: number) => {
    if (board[index] || isGameOver) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);

    const newGame = {
      board: newBoard.map(cell => (cell === null ? '' : cell)),
      currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
      status: gameResult ? (gameResult === 'Draw' ? 'Draw' : gameResult) : 'In Progress',
    };

    if (id) {
      await axios.put(`${BACKEND_URL}/${id}`, newGame);
    } else {
      const response = await axios.post(BACKEND_URL, newGame);
      setId(response.data.id);
    }

    if (gameResult) {
      setWinner(gameResult);
      setIsGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const makeComputerMove = async () => {
    try {
      if (id) {
        console.log("Making computer move for game ID:", id);
        await axios.post(`${BACKEND_URL}/${id}/computer-move`);
        
        // Fetch updated game state after the computer move
        const gameResponse = await axios.get(`${BACKEND_URL}/${id}`);
        const game = gameResponse.data;
        
        // Update state with the new game data
        setBoard(game.board.flat()); // Ensure board is in flat format if needed
        setCurrentPlayer(game.currentPlayer);
        setWinner(game.status === 'Draw' ? 'Draw' : game.status);
        setIsGameOver(game.status !== 'In Progress');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios-specific errors
        console.error('Error making computer move:', {
          message: error.message,
          response: error.response ? error.response.data : 'No response data',
          status: error.response ? error.response.status : 'No status'
        });
      } else {
        // Handle non-Axios errors
        console.error('Unexpected error:', error);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(SIZE * SIZE).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setIsGameOver(false);
    setId(null);
  };

  return { board, currentPlayer, winner, isGameOver, handleClick, resetGame };
};

export default useTicTacToe;
