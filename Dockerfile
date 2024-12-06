# Stage 1: Build Stage
FROM node:14.18.3-alpine3.15 AS builder

WORKDIR /app

# Copy package files for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --no-package-lock

# Copy the entire source code and build
COPY . .
RUN npm run build

# Stage 2: Runtime Stage (distroless) ---> Application runs with a non-root user by default in distroless
FROM gcr.io/distroless/nodejs:14

WORKDIR /app

# Copy dependencies and built code
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Set NODE_OPTIONS for ES module resolution
ENV NODE_OPTIONS="--es-module-specifier-resolution=node"

# Start the application
CMD ["dist/main.js"]