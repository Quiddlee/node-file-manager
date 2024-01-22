import greetings from './views/grettings.js';
import exit from './views/exit.js';
import logWorkingDirPath from './views/logWorkingDirPath.js';
import readline from 'readline';
import * as os from 'os';
import { WAITING } from './const.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

process.chdir(os.homedir());
process.on('beforeExit', exit);
rl.on('line', (l) => {
  console.log(l);
  logWorkingDirPath();
});

greetings();
logWorkingDirPath();
console.log(WAITING);
