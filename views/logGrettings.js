import getUsername from '../lib/helpers/getUsername.js';
import paint from '../lib/helpers/paint.js';
import { GREETINGS } from '../lib/const/const.js';

/**
 * Logs a greeting message to the console.
 * @returns {void} Nothing.
 */
const logGreetings = () => {
  const username = getUsername();
  console.log(`👋 ${ GREETINGS }, ${ paint(username, 'yellow', 'bold') }!`);
};

export default logGreetings;
