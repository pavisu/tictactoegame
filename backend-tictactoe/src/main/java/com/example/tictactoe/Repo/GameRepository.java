package com.example.tictactoe.Repository;

import com.example.tictactoe.Entity.GameEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends MongoRepository<GameEntity, String> {
}