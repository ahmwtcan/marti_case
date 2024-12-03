#!/bin/sh

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Seed the database
echo "Seeding the database..."
npm run seed

# Start the application
echo "Starting the application..."
npm run start:prod