import greetings from './views/grettings.js';
import exit from './views/exit.js';
import logWorkingDirPath from './views/logWorkingDirPath.js';
import readline from 'readline';
import * as os from 'os';
import { WAITING } from './const.js';
import { add, cat, cd, cp, ls, mv, rm, rn, up } from './controllers/filesController.js';
import getCmdPart from './lib/helpers/getCmdPart.js';
import paint from './lib/helpers/paint.js';
import { architecture, cpus, eol, homedir, username } from './controllers/osController.js';
import { calcHash, compress } from './controllers/externalController.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

process.chdir(os.homedir());
process.on('beforeExit', exit);
rl.on('line', async (line) => {
  const userFileCommand = getCmdPart(line);
  const userOsCommand = getCmdPart(line, 1)?.slice(2);

  switch (userFileCommand) {
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

    case 'cp':
      await cp(getCmdPart(line, 1), getCmdPart(line, 2));
      break;

    case 'mv':
      mv(getCmdPart(line, 1), getCmdPart(line, 2));
      break;

    case 'rm':
      rm(getCmdPart(line, 1), getCmdPart(line, 2));
      break;
  }

  switch (userOsCommand) {
    case 'EOL':
      eol();
      break;

    case 'cpus':
      cpus();
      break;

    case 'homedir':
      homedir();
      break;

    case 'username':
      username();
      break;

    case 'architecture':
      architecture();
      break;
  }

  switch (userFileCommand) {
    case 'hash':
      calcHash(getCmdPart(line, 1));
      break;

    case 'compress':
      compress(getCmdPart(line, 1), getCmdPart(line, 2));
      break;
  }

  logWorkingDirPath();
  console.log(paint(WAITING, 'cyan', 'italic'));
});

greetings();
logWorkingDirPath();
console.log(paint(WAITING, 'cyan', 'italic'));
