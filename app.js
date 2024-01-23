import greetings from './views/grettings.js';
import logExit from './views/logExit.js';
import logWorkingDirPath from './views/logWorkingDirPath.js';
import readline from 'readline';
import * as os from 'os';
import { INVALID_INPUT, WAITING } from './const.js';
import * as filesController from './controllers/filesController.js';
import * as osController from './controllers/osController.js';
import * as externalController from './controllers/externalController.js';
import paint from './lib/helpers/paint.js';
import getCmdPart from './lib/helpers/getCmdPart.js';
import logError from './views/logError.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

process.chdir(os.homedir());
process.on('exit', logExit);
rl.on('line', (line) => {
  const userFilesCommand = getCmdPart(line);
  const filesOperation = filesController[userFilesCommand];

  const userOsCommand = getCmdPart(line, 1)?.slice(2);
  const osOperation = osController[userOsCommand];

  // replace the dot . in order to ensure that the .exit command will work as expected
  const externalOperation = externalController[userFilesCommand.replace('.', '')];

  const oldPath = getCmdPart(line, 1);
  const newPath = getCmdPart(line, 2);

  if (!filesOperation && !osOperation && !externalOperation) {
    logError(INVALID_INPUT);
  } else {
    filesOperation?.(oldPath, newPath);
    osOperation?.();
    externalOperation?.(oldPath, newPath);
  }

  logWorkingDirPath();
  console.log(paint(WAITING, 'cyan', 'italic'));
});

greetings();
logWorkingDirPath();
console.log(paint(WAITING, 'cyan', 'italic'));
