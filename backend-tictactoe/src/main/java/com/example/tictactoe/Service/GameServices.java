package com.example.tictactoe.Service;

import com.example.tictactoe.Entity.GameEntity;
import com.example.tictactoe.Repo.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;
import java.util.stream.IntStream;
import java.util.logging.Logger;

@Service
public class GameServices {

    @Autowired
    private GameRepository gameRepository;

    private Random random = new Random();
    private static final Logger logger = Logger.getLogger(GameServices.class.getName());

    public GameEntity createGame() {
        GameEntity game = new GameEntity();
        game.setBoard(new String[9]); // Initialize 1D array of Strings
        game.setCurrentPlayer('X'); // X starts
        game.setStatus("In Progress");
        return gameRepository.save(game);
    }

    public Optional<GameEntity> getGameById(String id) {
        return gameRepository.findById(id);
    }

    public Optional<GameEntity> updateGame(String id, GameEntity game) {
        if (!gameRepository.existsById(id)) {
            return Optional.empty();
        }
        game.setId(id);
        return Optional.of(gameRepository.save(game));
    }

    public GameEntity makeComputerMove(GameEntity game) {
        try {
            String[] board = game.getBoard();
            int[] emptyIndices = getEmptyIndices(board);

            if (emptyIndices.length == 0) {
                logger.info("No empty cells left for computer move.");
                return game;
            }

            int randomIndex = emptyIndices[random.nextInt(emptyIndices.length)];
            board[randomIndex] = String.valueOf(game.getCurrentPlayer());

            logger.info("Computer moves at index: " + randomIndex);

            char winner = checkWinner(board);
            if (winner != ' ') {
                game.setStatus(winner == 'D' ? "Draw" : String.valueOf(winner));
            } else {
                game.setCurrentPlayer(game.getCurrentPlayer() == 'X' ? 'O' : 'X');
                game.setStatus("In Progress");
            }

            game.setBoard(board);
            return gameRepository.save(game);
        } catch (Exception e) {
            logger.severe("Error making computer move: " + e.getMessage());
            throw e;  // Ensure exception is propagated
        }
    }

    private int[] getEmptyIndices(String[] board) {
        return IntStream.range(0, board.length)
                .filter(i -> board[i] == null || board[i].isEmpty())
                .toArray();
    }

    private char checkWinner(String[] board) {
        int[][] lines = {
            {0, 1, 2}, {3, 4, 5}, {6, 7, 8}, // Rows
            {0, 3, 6}, {1, 4, 7}, {2, 5, 8}, // Columns
            {0, 4, 8}, {2, 4, 6}             // Diagonals
        };

        for (int[] line : lines) {
            String a = board[line[0]];
            String b = board[line[1]];
            String c = board[line[2]];
            if (a != null && a.equals(b) && a.equals(c)) {
                return a.charAt(0);
            }
        }

        return IntStream.range(0, board.length)
                .anyMatch(i -> board[i] == null || board[i].isEmpty()) ? ' ' : 'D';
    }
}
