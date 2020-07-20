#!/bin/sh
# migration-to-docker.sh
set -e
cmd="$@"
echo "cmd: $cmd"
until npx sequelize db:migrate; do
>&2 echo "Database is unavailable - sleeping"
  sleep 1
done
>&2 echo "Database is up and migrations runned - starting application"
exec $cmd