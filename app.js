import logGreetings from './views/logGrettings.js';
import logExit from './views/logExit.js';
import logWorkingDirPath from './views/logWorkingDirPath.js';
import readline from 'readline';
import * as os from 'os';
import * as filesController from './controllers/filesController.js';
import * as osController from './controllers/osController.js';
import * as externalController from './controllers/externalController.js';
import paint from './lib/helpers/paint.js';
import getCmdPart from './lib/helpers/getCmdPart.js';
import logError from './views/logError.js';
import { INVALID_INPUT, WAITING } from './lib/const/const.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

process.chdir(os.homedir());
process.on('exit', logExit);
rl.on('line', (line) => {
  const userFilesCommand = getCmdPart(line);
  const filesOperation = filesController[userFilesCommand];

  // slicing command e.g. --homedir to get just homedir. toLowerCase() in order to make all command to be the same e.g. EOL -> eol
  const userOsCommand = getCmdPart(line, 1)?.slice(2)?.toLowerCase();
  const osOperation = osController[userOsCommand];

  // replace the dot . in order to ensure that the .exit command would work as expected
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

logGreetings();
logWorkingDirPath();
console.log(paint(WAITING, 'cyan', 'italic'));
