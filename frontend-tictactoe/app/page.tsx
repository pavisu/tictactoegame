"use client";

import React from 'react';
import useTicTacToe from './hooks/useTicTacToe';
import '../styles/globals.css';

const Home: React.FC = () => {
  const { board, currentPlayer, winner, isGameOver, handleClick, resetGame } = useTicTacToe();

  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <div className="grid">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`button ${cell || ''}`}
            onClick={() => handleClick(index)}
            disabled={!!cell || isGameOver}
          >
            {cell || ''}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {winner ? (
          winner === 'Draw' ? (
            <div className="text-4xl">It is a draw!</div>
          ) : (
            <div className="text-4xl">Player {winner} wins!</div>
          )
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
