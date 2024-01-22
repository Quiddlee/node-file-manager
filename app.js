import greetings from './views/grettings.js';
import exit from './views/exit.js';
import logWorkingDirPath from './views/logWorkingDirPath.js';
import readline from 'readline';
import * as os from 'os';
import { WAITING } from './const.js';
import { cd, up } from './controllers/controller.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

process.chdir(os.homedir());
process.on('beforeExit', exit);
rl.on('line', async (line) => {
  switch (line) {
    case 'up':
      up();
      break;
    case line.startsWith('cd'):
      const specifiedPath = line.split(' ').at(1);
      cd(specifiedPath);
      break;
  }

  logWorkingDirPath();
});

greetings();
logWorkingDirPath();
console.log(WAITING);
