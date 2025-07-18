# ==================================================
# Development Dockerfile for Nuxt 3 Landing Page
# ==================================================

FROM node:22.16.0-alpine

# Install system dependencies including su-exec
RUN apk add --no-cache libc6-compat python3 make g++ curl su-exec

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs
RUN chown -R nuxtjs:nodejs /app

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=development

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start development server with hot reload, fix ownership, then drop to nuxtjs user
CMD ["sh", "-c", "chown -R nuxtjs:nodejs /app/.output /app/.nuxt && su-exec nuxtjs npm run dev"]
