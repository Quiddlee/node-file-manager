import { GREETINGS } from '../const.js';

const greetings = () => {
  const userArg = process.argv.slice(2).at(0);
  const username = userArg.slice(userArg.lastIndexOf('=') + 1);
  console.log(`${ GREETINGS }, ${ username }!`);
};

export default greetings;
