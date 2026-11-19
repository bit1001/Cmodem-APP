#!/usr/bin/env bash
# Keep the iOS bundle byte-identical to the Android assets. Run after any
# upstream asset change; core_bootstrap.js is extracted from core.html so the
# JavaScript logic has exactly one source of truth.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$(cd "$HERE/../app/src/main/assets" && pwd)"
DST="$HERE/App/CmodemApp/Assets"
mkdir -p "$DST"
DST="$(cd "$DST" && pwd)"
cp -f "$SRC"/*.js "$SRC"/*.css "$SRC"/*.html "$SRC"/*.json "$DST"/
python3 - "$SRC/core.html" "$DST/core_bootstrap.js" <<'PY'
import re, sys
html = open(sys.argv[1], encoding='utf-8').read()
blocks = re.findall(r'<script(?:\s[^>]*)?>(.*?)</script>', html, re.S)
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(blocks).rstrip() + '\n')
PY
echo "synced $(find "$DST" -maxdepth 1 -type f | wc -l) assets"
