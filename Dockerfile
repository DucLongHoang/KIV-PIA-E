FROM postgres:latest

# Set default environment variables
ENV POSTGRES_DB=default_db
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password

# Expose the PostgreSQL port
EXPOSE 5432
