'use strict';

const { execSync } = require('child_process');
require('dotenv').config();

const device = process.env.DEVICE;

if (!device) {
  console.error('DEVICE not defined in .env');
  process.exit(1);
}

execSync(`tizen install -n ./build/reacttizen.wgt -s ${device}`, {
  stdio: 'inherit',
});
