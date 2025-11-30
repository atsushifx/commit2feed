// src: shared/common/configs/tsup.config.module.ts
// @(#) : tsup config for ESM module
//
// Copyright (c) 2025 atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// system config
import { defineConfig } from 'tsup';

// user config
import { baseConfig } from '../../../../base/configs/tsup.config.base';

// configs
export default defineConfig({
  ...baseConfig,

  // entry points
  entry: {
    'index': './src/index.ts',
  },

  // sub-packages definition
  format: ['esm'],
  outDir: 'module', // for ESM
  // tsconfig
  tsconfig: './tsconfig.build.json',
  // DTS with incremental build for ESM
  dts: true,
});
