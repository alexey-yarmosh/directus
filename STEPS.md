<!-- 1. Checkout to the version of the globalping-dash-directus. -->
git ch v11.1.1

<!-- 2. Remove prev dependencies. -->
rm -rf node_modules && rm -rf api/node_modules && rm -rf app/node_modules

<!-- 3. Run in globalping-dash-directus: -->
<!-- pnpm i && pnpm -r build -->

<!-- 4. Clear the extensions folder. -->
rm -rf ~/Documents/web/jsd/directus-repo-2/api/extensions/*

<!-- 5. Copy builded dependencies from globalping-dash-directus to directus-repo-2. -->
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/bytes-value/ ~/Documents/web/jsd/directus-repo-2/api/extensions/bytes-value/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/endpoints/adoption-code/ ~/Documents/web/jsd/directus-repo-2/api/extensions/adoption-code/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/endpoints/credits-timeline/ ~/Documents/web/jsd/directus-repo-2/api/extensions/credits-timeline/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/endpoints/redirect/ ~/Documents/web/jsd/directus-repo-2/api/extensions/redirect/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/endpoints/sync-github-data/ ~/Documents/web/jsd/directus-repo-2/api/extensions/sync-github-data/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/hooks/adopted-probe/ ~/Documents/web/jsd/directus-repo-2/api/extensions/adopted-probe/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/hooks/directus-users/ ~/Documents/web/jsd/directus-repo-2/api/extensions/directus-users/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/hooks/gp-tokens/ ~/Documents/web/jsd/directus-repo-2/api/extensions/gp-tokens/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/hooks/location-overrides/ ~/Documents/web/jsd/directus-repo-2/api/extensions/location-overrides/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/hooks/notifications-format/ ~/Documents/web/jsd/directus-repo-2/api/extensions/notifications-format/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/hooks/sign-in/ ~/Documents/web/jsd/directus-repo-2/api/extensions/sign-in/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/hooks/sign-up/ ~/Documents/web/jsd/directus-repo-2/api/extensions/sign-up/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/interfaces/github-username/ ~/Documents/web/jsd/directus-repo-2/api/extensions/github-username/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/interfaces/gp-tags/ ~/Documents/web/jsd/directus-repo-2/api/extensions/gp-tags/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/interfaces/secrets/ ~/Documents/web/jsd/directus-repo-2/api/extensions/secrets/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/interfaces/token/ ~/Documents/web/jsd/directus-repo-2/api/extensions/token/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/modules/probes-adapter/ ~/Documents/web/jsd/directus-repo-2/api/extensions/probes-adapter/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/operations/adopted-probes-credits-cron-handler/ ~/Documents/web/jsd/directus-repo-2/api/extensions/adopted-probes-credits-cron-handler/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/operations/adopted-probes-status-cron-handler/ ~/Documents/web/jsd/directus-repo-2/api/extensions/adopted-probes-status-cron-handler/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/operations/gh-webhook-handler/ ~/Documents/web/jsd/directus-repo-2/api/extensions/gh-webhook-handler/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/operations/remove-banned-users-cron-handler/ ~/Documents/web/jsd/directus-repo-2/api/extensions/remove-banned-users-cron-handler/
rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/operations/sponsors-cron-handler/ ~/Documents/web/jsd/directus-repo-2/api/extensions/sponsors-cron-handler/
<!-- Ignore /extensions/lib folder, it was already included in required extensions during build: -->
<!-- rsync -av ~/Documents/web/jsd/globalping-dash-directus/src/extensions/lib/ ~/Documents/web/jsd/directus-repo-2/api/extensions/lib/ -->

<!-- 6. in package.json rename `dist/*.js` to `src/*.ts`. -->

<!-- 7. From extension folder run `rm -rf node_modules package-lock.json && npm i` -->

<!-- 8. Run `pnpm --filter api dev` to view the logs. Verify that there are no errors. -->

<!-- 9. Run only VSCode debug, that is enough to run both BE and FE. It should be autoupdated and debuggable. -->
