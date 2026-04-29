#!/usr/bin/env bash
# Starter hugo server med alle lokalt klonede SAMT-X-moduler substituert
# for GitHub-versjonene. Kjøres fra samt-bu-docs-roten eller tools/-mappen.
#
# Bruk:
#   tools/hugo-local.sh           # standard lokal server
#   tools/hugo-local.sh --drafts  # inkluder utkast (draft: true)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PARENT_DIR="$(cd "$REPO_ROOT/.." && pwd)"
HUGO_TOML="$REPO_ROOT/hugo.toml"

DRAFTS=""
for arg in "$@"; do
  [[ "$arg" == "--drafts" ]] && DRAFTS="-D"
done

echo "samt-bu-docs lokal server"
echo "========================="
echo "Sjekker lokale modulkloner i $PARENT_DIR ..."
echo ""

replacements=""

while IFS= read -r module_path; do
  repo="${module_path##*/}"
  local_dir="$PARENT_DIR/$repo"
  if [ -d "$local_dir/.git" ]; then
    echo "  ✓  $repo  →  lokal"
    entry="$module_path -> $local_dir"
    replacements="${replacements:+${replacements},}${entry}"
  else
    echo "  ·  $repo  →  GitHub (ingen lokal klon funnet)"
  fi
done < <(grep -E '^\s*path\s*=\s*"github\.com/SAMT-X/' "$HUGO_TOML" \
         | sed 's/.*"\(.*\)"/\1/')

echo ""

cd "$REPO_ROOT"

if [ -n "$replacements" ]; then
  echo "Starter hugo server med lokale erstatninger ..."
  echo ""
  GONOSUMDB="*" \
  GOPROXY="direct" \
  HUGO_MODULE_REPLACEMENTS="$replacements" \
  hugo server $DRAFTS --disableFastRender
else
  echo "Ingen lokale kloner funnet – henter alt fra GitHub ..."
  echo ""
  GONOSUMDB="*" \
  GOPROXY="direct" \
  hugo server $DRAFTS --disableFastRender
fi
