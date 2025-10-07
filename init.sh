#!/bin/bash

set -e

echo '1. Clearing the extensions folder'
cd '/Users/baderfall/Documents/web/jsd/directus'
rm -rf api/extensions/*
rm -rf api/lib

echo '2. Copying extensions'
tsx sync-extensions.ts

echo '3. Updating AUTH_GITHUB_DEFAULT_ROLE_ID'
cd '/Users/baderfall/Documents/web/jsd/globalping-dash-directus'
GITHUB_ROLE_ID=$(grep '^AUTH_GITHUB_DEFAULT_ROLE_ID=' .env.scripts.development | cut -d'=' -f2)
cd '/Users/baderfall/Documents/web/jsd/directus'
sed -i '' "s/^AUTH_GITHUB_DEFAULT_ROLE_ID=.*/AUTH_GITHUB_DEFAULT_ROLE_ID=$GITHUB_ROLE_ID/" api/.env
