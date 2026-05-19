# Multi-stage build for Vite + React static site
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first to leverage caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
