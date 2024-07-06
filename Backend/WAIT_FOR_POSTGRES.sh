#!/bin/bash
set -e

export PGPASSWORD=123

until psql -h db -U "$DB_USER" -d "$DB_NAME" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"

npx prisma migrate deploy
npx prisma generate
npm run start



