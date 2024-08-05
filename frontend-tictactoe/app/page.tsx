"use client";

import React from 'react';
import useTicTacToe from '../app/hooks/useTicTacToe'; // Adjust the path if needed
import '../styles/globals.css'; // Import global styles

const Home: React.FC = () => {
  const { board, currentPlayer, winner, isGameOver, handleClick, resetGame } = useTicTacToe();

  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <div className="grid">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`button ${cell ? cell : ''}`} // Apply styles based on the cell value
            onClick={() => handleClick(index)}
            disabled={!!cell || isGameOver} // Disable button if cell is filled or game is over
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {winner ? (
          <div className="text-4xl">
            {winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`}
          </div>
        ) : (
          !isGameOver && <div className="text-xl">Current Player: {currentPlayer}</div>
        )}
        <button className="mt-4 retry-button" onClick={resetGame}>
          Retry
        </button>
      </div>
    </main>
  );
};

export default Home;
