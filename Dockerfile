# syntax=docker/dockerfile:1

# 依赖安装阶段：安装生产与构建所需依赖
FROM node:20-alpine AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci

# 构建阶段：复制源码并进行 Next.js 生产构建
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 运行阶段：仅安装生产依赖并启动服务
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# 仅安装生产依赖，减小镜像体积
COPY package*.json ./
RUN npm ci --omit=dev

# 复制构建产物与必要静态资源
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# 使用非 root 用户运行更安全
USER node

EXPOSE 3000

# next start 会读取 PORT 环境变量
CMD ["npm", "run", "start"]

