# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY . .
RUN corepack enable && corepack prepare yarn@3.2.3 --activate

RUN yarn install --immutable

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG RAILWAY_ENVIRONMENT_NAME
ARG NEXT_PUBLIC_IMAGE_PORT
ARG NEXT_PUBLIC_IMAGE_HOSTNAME
ARG NEXT_PUBLIC_IMAGE_PROTOCOL
ARG NEXT_PUBLIC_NETWORK_NAME
ARG NEXT_PUBLIC_TOKEN_SYMBOL
ENV NODE_ENV=production
ARG NEXT_PUBLIC_BASE_URL

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

ENV PORT=8080

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]