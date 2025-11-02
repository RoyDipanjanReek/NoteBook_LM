# Use Node.js LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Expose port (if you have an API)
EXPOSE 3000

# Run your app
CMD ["npm", "run", "dev"]
