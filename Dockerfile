# Stage 1: Build
FROM node:18.18-alpine AS build

WORKDIR /app

# Install dependencies required for building Prisma and OpenSSL 1.1
RUN apk add --no-cache openssl

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code and build the application
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18.18-alpine

WORKDIR /app

# Install OpenSSL runtime for Prisma compatibility
RUN apk add --no-cache openssl

# Copy built files and Prisma schema from build stage
COPY --from=build /app /app

# Install production dependencies
RUN npm ci --omit=dev

# Add and set executable permission for the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Expose the application port
EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]