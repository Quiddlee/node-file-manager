let cache;

/**
 * Returns username
 *
 * @return {string}
 */
const getUsername = () => {
  if (cache) return cache;

  const userArg = process.argv.slice(2).at(0);
  const username = userArg.slice(userArg.lastIndexOf('=') + 1);
  cache = username;

  return username;
};

export default getUsername;
