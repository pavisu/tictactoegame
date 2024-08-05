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
            className={cell ? `button ${cell}` : 'button'}
            onClick={() => handleClick(index)}
            disabled={!!cell || isGameOver}
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {winner ? (
          <div className="text-4xl">Player {winner} wins!</div>
        ) : isGameOver ? (
          <div className="text-4xl">It's a draw!</div>
        ) : (
          <div className="text-xl">Current Player: {currentPlayer}</div>
        )}
        <button className="mt-4" onClick={resetGame}>
          Retry
        </button>
      </div>
    </main>
  );
};

export default Home;
