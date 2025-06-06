FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apk add --no-cache libc6-compat && \
    corepack enable && \
    pnpm install turbo --global
 
FROM base AS builder
RUN apk add --no-cache openssl
WORKDIR /usr/src/app

COPY .git/ ./.git/

COPY package.json pnpm-lock.yaml* ./
COPY . .
RUN turbo prune --scope=@full-stack/api --docker
 
FROM base AS installer
WORKDIR /usr/src/app
 
COPY .gitignore .gitignore
# COPY reset.d.ts reset.d.ts # only if you're using ts-reset library
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=builder /usr/src/app/out/full/ .
COPY --from=builder /usr/src/app/.git/ ./.git/
 
RUN pnpm install --frozen-lockfile
COPY turbo.json turbo.json
# RUN npx prisma generate --schema apps/api/prisma/schema.prisma
RUN turbo run prisma:g
RUN turbo run build --filter=@full-stack/api...
 
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
 
RUN apk add --no-cache openssl git && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
 
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/api/package.json ./apps/api/package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/api/node_modules ./apps/api/node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/api/prisma ./apps/api/prisma
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/packages ./packages
# COPY --chown=nodejs:nodejs ./.git ./.git
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/.git/ ./apps/api/.git/
 
USER nodejs
WORKDIR /usr/src/app/apps/api

# RUN npx prisma generate --schema ./prisma/schema.prisma
RUN env

# RUN npm run prisma:g


# CMD node dist/main.js
# CMD ["node", "dist/src/main.js"]

CMD ["sh", "-c", "echo '--- Runtime Environment Variables ---' && env && ls -la && echo '--- Starting Application ---' && node dist/src/main.js"]