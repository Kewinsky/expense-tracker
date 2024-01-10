# Use a base image with Node.js 18
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the React app
RUN npm run build

# Command to run the application
CMD ["npm", "start"]
