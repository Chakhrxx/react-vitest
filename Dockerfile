# Use an official Node.js runtime as a parent image
FROM node:19 as develop

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY pnpm-lock*.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install project dependencies using pnpm
RUN pnpm install  

# Copy the rest of your application code to the working directory
COPY . .

# Expose port 5173 for the NextJS application
EXPOSE 5173

# Start the application in development mode
CMD ["pnpm", "run", "dev"]
