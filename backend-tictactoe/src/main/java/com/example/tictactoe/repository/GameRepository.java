package main.java.com.example.tictactoe.repository;

import com.example.tictactoe.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String> {
}
