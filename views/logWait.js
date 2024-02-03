import paint from '../lib/helpers/paint.js';
import { WAITING } from '../lib/const/const.js';

/**
 * Logs a waiting message to the console.
 * @returns {void} Nothing.
 */
const logWait = () => {
  console.log(paint(WAITING, 'cyan', 'italic'));
};

export default logWait;
