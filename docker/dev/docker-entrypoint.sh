#!/bin/bash
set -e

export NG_CLI_ANALYTICS=ci
export NODE_OPTIONS=--max_old_space_size=12192
export CYPRESS_CACHE_FOLDER=./tmp/Cypress

rm -rf /app/package-lock.json

npm install --legacy-peer-deps --package-lock=false

node node_modules/@angular/cli/bin/ng serve --host 0.0.0.0 --port 4200

exec "$@"
