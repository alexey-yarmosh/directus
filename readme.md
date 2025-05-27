# Notes:
# Interface extensions executed as *.ts files are not working.

# Use:

0.1. Create a symlink to node_modules if needed `ln -s ~/Documents/web/jsd/globalping-dash-directus/node_modules/ ~/Documents/web/jsd/node_modules/`
0.2. update api/src/extensions/lib file to patch extension paths from `dist/index.js` to `src/index.ts`
0.3. remove `--ignore extensions` from api/package.json

1. npm run init:dev
6. Run `pnpm --filter api dev` to view the logs. Verify that there are no errors.
7. Run only VSCode debug, that is enough to run both BE and FE. It should be autoupdated and debuggable. (you can try to add --ignore extensions in package.json if it reloads too long)
8. Commit changes and push using: `git push -f alexey-yarmosh HEAD:v11`
