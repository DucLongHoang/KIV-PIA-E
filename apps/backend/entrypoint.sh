#!/bin/bash
set -e

# Remove the shared library in node_modules if already there
rm -rf /app/frontend/node_modules/shared

# Symlink the shared dist to the frontend node_modules
ln -s /app/shared/dist /app/frontend/node_modules/shared

# Wait for the PostgreSQL server to be available
echo "Waiting for postgres..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL started"

# Go to the backend folder
cd /app/backend

# Run Prisma migrations
echo "Running migrations..."
npm run db:migrate

# Seed the database (optional, remove if not needed)
echo "Seeding database..."
npm run db:seed

# Start the backend server in the background
echo "Starting backend server..."
PORT=$BACKEND_PORT npm start &

# Go to the frontend folder
cd /app/frontend

# Start the frontend server in the background
echo "Starting frontend server..."
PORT=$FRONTEND_PORT npm start &

# Wait for any process to exit
wait -n

# Exit with status of process that exited first
exit $?
