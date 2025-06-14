'use strict';

const { execSync } = require('child_process');
require('dotenv').config(); // Load .env

const profile = process.env.PROFILE;

if (!profile) {
  console.error('PROFILE not defined in .env');
  process.exit(1);
}

execSync(`tizen package -t wgt -s ${profile} -o ./build -- ./build`, {
  stdio: 'inherit',
});
