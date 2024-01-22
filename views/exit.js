import getUsername from '../lib/helpers/getUsername.js';
import { EXIT } from '../const.js';

const exit = () => {
  const username = getUsername();
  console.log(`${ EXIT }, ${ username }, goodbye!`);
};

export default exit;
