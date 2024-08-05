package com.example.tictactoe.Repository;

import com.example.tictactoe.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

//@Repository
public interface GameRepository extends MongoRepository<Game, String> {
}
