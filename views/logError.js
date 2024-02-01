import paint from '../lib/helpers/paint.js';
import { ERROR } from '../lib/const/const.js';

/**
 * Logs an error message to the console.
 * @param {string} [message=ERROR] - The error message to log. Defaults to 'ERROR'.
 * @returns {void} Nothing.
 */
const logError = (message) => {
  console.log(paint(message ?? ERROR, 'red', 'bold'));
};

export default logError;
