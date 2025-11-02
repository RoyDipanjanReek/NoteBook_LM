# ----------------------------
# 1️⃣ Build stage
# ----------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy all app files
COPY . .

# Build Next.js app
RUN npm run build

# ----------------------------
# 2️⃣ Production stage
# ----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
