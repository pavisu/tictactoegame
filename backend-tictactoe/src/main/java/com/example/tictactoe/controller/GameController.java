package com.example.tictactoe.controller;

import com.example.tictactoe.Entity.GameEntity;
import com.example.tictactoe.Service.GameServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.logging.Logger;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameServices gameService;

    private static final Logger logger = Logger.getLogger(GameController.class.getName());

    @PostMapping
    public GameEntity createGame() {
        logger.info("Create Game Endpoint Called");
        return gameService.createGame();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameEntity> getGameById(@PathVariable String id) {
        logger.info("Get Game by ID Endpoint Called for ID: " + id);
        Optional<GameEntity> game = gameService.getGameById(id);
        return game.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameEntity> updateGame(@PathVariable String id, @RequestBody GameEntity game) {
        logger.info("Update Game Endpoint Called for ID: " + id);
        Optional<GameEntity> updatedGame = gameService.updateGame(id, game);
        return updatedGame.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/computer-move")
    public ResponseEntity<GameEntity> makeComputerMove(@PathVariable String id) {
        logger.info("Computer Move Endpoint Called for Game ID: " + id);
        Optional<GameEntity> gameOpt = gameService.getGameById(id);
        if (!gameOpt.isPresent()) {
            logger.warning("Game not found for ID: " + id);
            return ResponseEntity.notFound().build();
        }

        GameEntity game = gameOpt.get();
        if (game.getStatus().equals("In Progress") && game.getCurrentPlayer() == 'O') {
            try {
                logger.info("Making computer move for game ID: " + id);
                game = gameService.makeComputerMove(game);
                return ResponseEntity.ok(game);
            } catch (Exception e) {
                logger.severe("Error making computer move for game ID: " + id + " - " + e.getMessage());
                return ResponseEntity.status(500).build();
            }
        }

        logger.warning("Invalid game state for computer move for game ID: " + id);
        return ResponseEntity.badRequest().build();
    }
}
