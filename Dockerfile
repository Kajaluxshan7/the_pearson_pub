FROM node:22.16.0-alpine

RUN apk add --no-cache libc6-compat python3 make g++ curl su-exec

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nuxtjs

# Initially set /app ownership to nuxtjs
RUN chown -R nuxtjs:nodejs /app

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV NODE_ENV=development

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Run as root to fix permissions on volumes, then switch user to nuxtjs for dev server
USER root

CMD ["sh", "-c", "chown -R nuxtjs:nodejs /app/.output /app/.nuxt && su-exec nuxtjs npm run dev"]
