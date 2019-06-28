#!/bin/bash
set -e

# Step 1
npm install npm@latest -g

# Step 2
npm install -g @angular/cli@7.3.9

# Step 3
npm install
npm rebuild node-sass

# Step 4
chmod -R o+s+w /app

# Step 5
#ng serve --host 0.0.0.0 --port 4200
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve --host 0.0.0.0 --port 80



exec "$@"
