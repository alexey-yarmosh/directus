#!/bin/bash

set -e

echo '1. Building extensions'
cd '/Users/baderfall/Documents/web/jsd/globalping-dash-directus'
pnpm i && pnpm -r build

echo '2. Clearing the extensions folder'
cd '/Users/baderfall/Documents/web/jsd/directus-repo-2'
rm -rf api/extensions/*

echo '3. Copying extensions'
tsx sync-extensions.ts
