# Stage 1: Build the application
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the source code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Serve the application
FROM node:latest

# Set working directory
WORKDIR /app

# Copy the build output from the first stage
COPY --from=builder /app ./

# Install `serve` to serve the built application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npx", "next", "start"]
