#!/bin/bash

set -e

# echo '1. Building extensions'
# cd '/Users/baderfall/Documents/web/jsd/globalping-dash-directus'
# pnpm i && pnpm -r build

echo '2. Clearing the extensions folder'
cd '/Users/baderfall/Documents/web/jsd/directus-repo-2'
rm -rf api/extensions/*
rm -rf api/lib

echo '3. Copying extensions'
tsx sync-extensions.ts

echo '4. Updating AUTH_GITHUB_DEFAULT_ROLE_ID'
cd '/Users/baderfall/Documents/web/jsd/globalping-dash-directus'
GITHUB_ROLE_ID=$(grep '^AUTH_GITHUB_DEFAULT_ROLE_ID=' .env.development | cut -d'=' -f2)
cd '/Users/baderfall/Documents/web/jsd/directus-repo-2'
sed -i '' "s/^AUTH_GITHUB_DEFAULT_ROLE_ID=.*/AUTH_GITHUB_DEFAULT_ROLE_ID=$GITHUB_ROLE_ID/" api/.env
