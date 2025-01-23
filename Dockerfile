# Stage 1: Build the React App
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve using Node.js
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Install a lightweight HTTP server
RUN npm install -g serve

# Copy the build files from the previous stage
COPY --from=build /app/dist .

# Expose the default port
EXPOSE 3000

# Command to run the server
CMD ["serve", "-s", ".", "-l", "3000"]