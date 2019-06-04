#!/bin/bash
set -e

# Step 1
npm install npm@latest -g

# Step 2
npm install -g @angular/cli

# Step 3
npm install
npm rebuild node-sass

# Step 4
chmod -R o+s+w /app

# Step 5
ng serve --host 0.0.0.0 --port 4200

exec "$@"
