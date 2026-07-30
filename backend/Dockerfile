# Stage 1: Build the Spring Boot 4 application
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /build

# Copy build wrappers and config first to maximize layer caching
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline -B

# Copy source code and build the production jar
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Create a minimal, lightweight production JRE runtime image
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Run as a non-root security best-practice
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the lightweight jar from the builder stage
COPY --from=builder /build/target/*.jar app.jar

# Inform Vercel's edge router
EXPOSE 80

# Execute Spring Boot 4, forcing it to listen on the dynamic Vercel $PORT
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT}"]
