#!/bin/bash
set -e

cat /dev/null > /app/src/environments/environment.ts
echo "export const environment = {" >> /app/src/environments/environment.ts
echo "production: false," >> /app/src/environments/environment.ts
echo "hmr: false," >> /app/src/environments/environment.ts
echo "base_url: 'http://172.19.1.11:8000/'," >> /app/src/environments/environment.ts
echo "api_url: 'http://172.19.1.11:8000/v1/'," >> /app/src/environments/environment.ts
echo "mercure_hub: 'http://172.19.1.20:5555/hub'," >> /app/src/environments/environment.ts
echo "xdebug: '?XDEBUG_SESSION_START=14013'" >> /app/src/environments/environment.ts
echo "};" >> /app/src/environments/environment.ts

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
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve --host 0.0.0.0 --port 80

exec "$@"
