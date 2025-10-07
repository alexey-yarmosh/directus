#!/bin/bash
# Links the globalping extensions into api/extensions, so this dev instance runs them from source.
# Pass the repo (or a worktree) to link, e.g.:
#   ./link-gp-extensions.sh ../globalping-dash-directus
#   ./link-gp-extensions.sh ../globalping-dash-directus/.worktrees/orgs
# The api has to be restarted afterwards: the watcher resolves the links once, at boot.

set -e

SOURCE=$(cd "${1:?Usage: $0 <path-to-globalping-dash-directus>}" && pwd)
TARGET="$(cd "$(dirname "$0")" && pwd)/api/extensions"

if [ ! -d "$SOURCE/src/extensions" ]; then
	echo "No src/extensions in $SOURCE"
	exit 1
fi

find "$TARGET" -maxdepth 1 -type l -delete

for packageJson in "$SOURCE"/src/extensions/*/package.json "$SOURCE"/src/extensions/*/*/package.json; do
	[ -f "$packageJson" ] || continue
	extension=$(dirname "$packageJson")
	node -e "process.exit(require('$packageJson')['directus:extension'] ? 0 : 1)" || continue
	ln -sfn "$extension" "$TARGET/$(basename "$extension")"
done

echo "Linked $(find "$TARGET" -maxdepth 1 -type l | wc -l | tr -d ' ') extensions from $SOURCE"
