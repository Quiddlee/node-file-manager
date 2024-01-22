import { GREETINGS } from '../const.js';
import getUsername from '../lib/helpers/getUsername.js';

const greetings = () => {
  const username = getUsername();
  console.log(`${ GREETINGS }, ${ username }!`);
};

export default greetings;
