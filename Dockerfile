# Dockerfile for Node.js backend
FROM node:14

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY --chown=node:node ./backend/ ./
RUN npm run build
COPY --chown=node:node ./backend/src/database/migrations/ ./dist/src/database/migrations/

EXPOSE 5000

# Specify the script to run when the container starts
# CMD ["npm", "run", "create:dev"]
# CMD ["npx", "gulp", "recreate-db:dev", "migrate-db:dev", "&&", "ts-node-dev", "src/server.ts"]
ENTRYPOINT [ "npm", "run", "create:dev" ]