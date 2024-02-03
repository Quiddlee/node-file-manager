import { DEFAULT_USERNAME } from '../const/const.js';

let cache;

/**
 * Returns username of the current session
 * @return {string} - The username
 */
const getUsername = () => {
  if (cache) return cache;

  const userArg = process.argv.slice(2).at(0) ?? DEFAULT_USERNAME;
  const username = userArg.slice(userArg.lastIndexOf('=') + 1);
  cache = username;

  return username;
};

export default getUsername;
