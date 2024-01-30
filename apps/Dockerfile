# Use the official Node.js 16 base image
FROM node:16.19.1

# Create app directory inside the Docker image
WORKDIR /app

# Install netcat
RUN apt-get update && apt-get install -y netcat

RUN npm install -g typescript

# Install backend dependencies
COPY backend/package*.json ./backend/
RUN npm install --prefix backend

# Bundle backend source
COPY backend/ ./backend/

# Build the backend
RUN npm run build --prefix backend

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN npm install --prefix frontend

# Bundle frontend source
COPY frontend/ ./frontend/

# Build the frontend application
RUN npm run build --prefix frontend

# Copy the entrypoint script into the image
COPY backend/entrypoint.sh /app/backend/entrypoint.sh

# Set the script as the entrypoint
ENTRYPOINT ["/app/backend/entrypoint.sh"]

# Set environment variables
ENV BACKEND_PORT=5000
ENV FRONTEND_PORT=3000
ENV NODE_ENV=production

# Expose the ports for backend and frontend
EXPOSE $BACKEND_PORT
EXPOSE $FRONTEND_PORT

# Start the backend and frontend applications
CMD ["sh", "-c", "cd backend && PORT=$BACKEND_PORT npm start & cd frontend && PORT=$FRONTEND_PORT npm start"]
