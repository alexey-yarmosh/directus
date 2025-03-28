#!/bin/bash

set -e

echo '1. Build extensions'
cd '/Users/baderfall/Documents/web/jsd/globalping-dash-directus'
pnpm i && pnpm -r build

echo '2. Clear the extensions folder'
cd '/Users/baderfall/Documents/web/jsd/directus-repo-2'
rm -rf api/extensions/*

echo '3. Copy extensions'
tsx sync-extensions.ts || true
tsx sync-extensions.ts || true
tsx sync-extensions.ts || true

echo '4. In package.json of required extension rename `dist/*.js` to `src/*.ts`.'
echo '5. From extension folder run `rm -rf node_modules package-lock.json && npm i`'
echo '6. Run `pnpm --filter api dev` to view the logs. Verify that there are no errors.'
echo '7. Run only VSCode debug, that is enough to run both BE and FE. It should be autoupdated and debuggable.'
echo '8. Commit changes and push using: `git push -f alexey-yarmosh HEAD:v11`'

