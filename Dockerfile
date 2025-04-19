FROM docker.io/oven/bun AS base
WORKDIR /usr/src/app

FROM base AS install
COPY package.json bun.lock .
RUN bun install --frozen-lockfile

FROM base AS release
COPY --from=install /usr/src/app/node_modules ./node_modules
COPY . .
RUN bun test
RUN ls ./calendar

EXPOSE 80/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]