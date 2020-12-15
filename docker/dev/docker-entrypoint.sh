#!/bin/bash
set -e

export NG_CLI_ANALYTICS=ci
export NODE_OPTIONS=--max_old_space_size=8192

rm -rf /app/package-lock.json

npm install

node node_modules/@angular/cli/bin/ng serve --host 0.0.0.0 --port 4200

exec "$@"
