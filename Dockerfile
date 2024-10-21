FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile --legacy-peer-deps
COPY . ./
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app /app
RUN npx prisma generate
RUN npm install --production --frozen-lockfile --ignore-scripts --legacy-peer-deps
EXPOSE 3000
CMD ["npm", "start"]
