# Use the official Node.js 16 base image
FROM node:16.19.1

# Create app directory inside the Docker image
WORKDIR /app

# Install shared dependencies and build shared resources
COPY shared/package*.json ./shared/
RUN npm install --prefix shared
COPY shared/ ./shared/
RUN npm run build --prefix shared

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN npm install --prefix backend

# Bundle backend source
COPY backend/ ./backend/
COPY shared/dist ./backend/node_modules/shared

# Build the backend
RUN npm run build --prefix backend

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend

# Remove the shared library in node_modules if already there
RUN rm -rf ./frontend/node_modules/shared

# Bundle frontend source
COPY frontend/ ./frontend/
COPY shared/ ./shared/

# Symlink the shared dist to the frontend node_modules
RUN ln -s ../shared/dist ./frontend/node_modules/shared

# Build the frontend application
RUN npm run build --prefix frontend

# Set environment variables
ENV BACKEND_PORT=5000
ENV FRONTEND_PORT=3000
ENV NODE_ENV=production

# Expose the ports for backend and frontend
EXPOSE $BACKEND_PORT
EXPOSE $FRONTEND_PORT

# Start the backend and frontend applications
CMD ["sh", "-c", "cd backend && PORT=$BACKEND_PORT npm start & cd frontend && PORT=$FRONTEND_PORT npm start"]
