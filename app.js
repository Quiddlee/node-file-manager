import greetings from './views/grettings.js';
import exit from './views/exit.js';
import logWorkingDirPath from './views/logWorkingDirPath.js';
import readline from 'readline';
import * as os from 'os';
import { WAITING } from './const.js';
import { up } from './controllers/controller.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

process.chdir(os.homedir());
process.on('beforeExit', exit);
rl.on('line', async (l) => {
  if (l === 'up') {
    up();
  }

  logWorkingDirPath();
});

greetings();
logWorkingDirPath();
console.log(WAITING);
