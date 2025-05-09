# Stage 1: Building the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files to leverage Docker layer caching
COPY package.json ./
# 检查是否存在package-lock.json，若不存在则跳过复制
COPY package-lock.json* ./ 2>/dev/null || :

# Install dependencies with fallbacks and verbose output
RUN echo "Installing dependencies..." && \
    # 如果有package-lock.json，使用npm ci，否则使用npm install
    if [ -f package-lock.json ]; then \
      npm ci --verbose || npm install --verbose; \
    else \
      npm install --verbose; \
    fi

# Copy all files
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Running the application
FROM node:18-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Set proper permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"] 