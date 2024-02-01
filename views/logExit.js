import getUsername from '../lib/helpers/getUsername.js';
import paint from '../lib/helpers/paint.js';
import { EXIT } from '../lib/const/const.js';

/**
 * Logs an exit message to the console.
 * @returns {void} Nothing.
 */
const logExit = () => {
  const username = getUsername();
  console.log(`❤️ ${ EXIT }, ${ paint(username, 'yellow', 'bold') }, goodbye!`);
};

export default logExit;
