import getUsername from '../lib/helpers/getUsername.js';
import { EXIT } from '../const.js';
import paint from '../lib/helpers/paint.js';

const exit = () => {
  const username = getUsername();
  console.log(`❤️ ${ EXIT }, ${ paint(username, 'yellow', 'bold') }, goodbye!`);
};

export default exit;
