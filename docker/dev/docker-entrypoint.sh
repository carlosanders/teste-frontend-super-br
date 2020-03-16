#!/bin/bash
set -e

# Step 4
#chmod -R o+s+w /app

# Step 5
#ng serve --host 0.0.0.0 --port 4200
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve --host 0.0.0.0 --port 4200

exec "$@"
