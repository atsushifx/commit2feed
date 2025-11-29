// src: shared/configs/tsup.config.base.ts
// @(#) : tsup base configuration
//
// Copyright (c) 2025 atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// libs
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// types
import type { Options } from 'tsup';

// ✅ __dirname for ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

export const baseConfig: Options = {
  format: ['esm'],
  target: 'es2022',
  clean: true,
  dts: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  shims: false,
  outDir: './lib',
  // overwrite it if sub-packages is necessary
  // entry: [  ],
};
