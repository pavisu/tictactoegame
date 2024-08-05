package main.java.com.example.tictactoe.controller;

import com.example.tictactoe.model.Game;
import com.example.tictactoe.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @PostMapping
    public Game createGame() {
        Game game = new Game();
        game.setBoard(new char[3][3]); // Initialize 3x3 board
        game.setCurrentPlayer('X'); // X starts
        game.setStatus("In Progress");
        return gameRepository.save(game);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Game> getGameById(@PathVariable String id) {
        Optional<Game> game = gameRepository.findById(id);
        return game.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Game> updateGame(@PathVariable String id, @RequestBody Game game) {
        if (!gameRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        game.setId(id);
        return ResponseEntity.ok(gameRepository.save(game));
    }
}
