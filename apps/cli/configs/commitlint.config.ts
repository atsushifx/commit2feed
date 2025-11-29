// src: shared/common/configs/commitlint.config.ts
// @(#) : commitlint configuration for common workspace
//
// Copyright (c) 2025 atsushifx <https://github.com/atsushifx>
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// type definitions
import type { UserConfig } from '@commitlint/types';

// import commitlint config type
import { default as baseConfig } from '../../../base/configs/commitlint.config.base.js'; // ← .js拡張子を必ず付ける

// import base Config

const config: UserConfig = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    // override rules write here
  },
};

export default config;
