
# Build Stage
FROM maven:3.8.3-openjdk-17-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Final Stage
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build /app/target/tictactoe-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java", "-jar", "tictactoe-0.0.1-SNAPSHOT.jar"]
CMD ["java","-jar","app.jar"]