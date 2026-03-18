#!/usr/bin/env bash
# CF Pages build script – installerer Hugo, henter siste modulversjoner og bygger nettstedet.
set -e

HUGO_VERSION="${HUGO_VERSION:-0.155.3}"

echo "=== Installerer Hugo ${HUGO_VERSION} ==="
curl -sL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz" \
  | tar -xz hugo
export PATH="$PWD:$PATH"

echo "=== Henter siste modulversjoner ==="
export GONOSUMDB="*"
export GOPROXY="direct"

hugo mod get github.com/SAMT-X/team-architecture@latest
hugo mod get github.com/SAMT-X/samt-bu-drafts@latest
hugo mod get github.com/SAMT-X/solution-samt-bu-docs@latest
hugo mod get github.com/SAMT-X/team-pilot-1@latest
hugo mod tidy

echo "=== Bygger nettsted ==="
hugo --gc --minify
