import greetings from './views/grettings.js';
import exit from './views/exit.js';
import logWorkingDirPath from './views/logWorkingDirPath.js';
import readline from 'readline';
import * as os from 'os';
import { WAITING } from './const.js';
import { add, cat, cd, ls, rn, up } from './controllers/controller.js';
import getCmdPart from './lib/helpers/getCmdPart.js';
import paint from './lib/helpers/paint.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

process.chdir(os.homedir());
process.on('beforeExit', exit);
rl.on('line', async (line) => {
  const userCommand = getCmdPart(line);

  switch (userCommand) {
    case 'up':
      up();
      break;

    case 'cd':
      cd(getCmdPart(line, 1));
      break;

    case 'ls':
      await ls();
      break;

    case 'cat':
      cat(getCmdPart(line, 1));
      break;

    case 'add':
      await add(getCmdPart(line, 1));
      break;

    case 'rn':
      await rn(getCmdPart(line, 1), getCmdPart(line, 2));
      break;
  }

  logWorkingDirPath();
  console.log(paint(WAITING, 'cyan', 'italic'));
});

greetings();
logWorkingDirPath();
console.log(paint(WAITING, 'cyan', 'italic'));
