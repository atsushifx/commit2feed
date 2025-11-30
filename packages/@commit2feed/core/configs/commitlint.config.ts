// src: shared/common/configs/commitlint.config.ts
// @(#) : commitlint configuration for common workspace
//
// Copyright (c) 2025 atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// import commitlint config type
import type { UserConfig } from '@commitlint/types';

// import base Config
import { default as baseConfig } from '../../../../base/configs/commitlint.config.base.js'; // ← .js拡張子を必ず付ける

// define commitlint config
const config: UserConfig = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // override rules write here
  },
};

export default config;
