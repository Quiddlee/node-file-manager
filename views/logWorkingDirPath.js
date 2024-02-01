import paint from '../lib/helpers/paint.js';

/**
 * Logs the current working directory path to the console.
 * @returns {void} Nothing.
 */
const logWorkingDirPath = () => {
  const workingDirPath = process.cwd();
  console.log(`📂 You are currently in ${ paint(workingDirPath, 'green', 'bold') }`);
};

export default logWorkingDirPath;
