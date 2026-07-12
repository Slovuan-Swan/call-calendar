# Стадия 1: сборка бэкенда
FROM node:20-alpine AS build-backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build

# Стадия 2: сборка фронтенда
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
# Убираем префикс /api, чтобы запросы шли напрямую на бэкенд
ENV VITE_API_BASE_URL=""
RUN npm run build

# Стадия 3: production-образ
FROM node:20-alpine
WORKDIR /app

# Копируем собранный бэкенд и его production-зависимости
COPY --from=build-backend /app/backend/dist ./backend/dist
COPY --from=build-backend /app/backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# Копируем собранный фронтенд в папку public
COPY --from=build-frontend /app/frontend/dist ./public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "backend/dist/index.js"]