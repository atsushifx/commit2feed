#!/usr/bin/env bash
## src: ./scripts/sync-configs.sh
# @(#) : Sync shared config files into target directory (by type)
#
# Copyright (c) 2025 atsushifx <http://github.com/atsushifx>
#
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

set -euCo pipefail

# Parse arguments
# Always use INIT_CWD (the directory where pnpm was invoked)
TARGET_DIR="${INIT_CWD:-.}"
DRY_RUN="${1:-}"

echo "Target Directory: $TARGET_DIR"
echo "Dry-run option: $DRY_RUN"
