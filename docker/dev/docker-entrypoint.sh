#!/bin/bash
set -e

export NG_CLI_ANALYTICS=ci

npm install

node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve --host 0.0.0.0 --port 4200

exec "$@"
