# Use a base image with OpenJDK 19
FROM openjdk:19-jdk

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/demo-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose the port your Spring Boot app is running on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
