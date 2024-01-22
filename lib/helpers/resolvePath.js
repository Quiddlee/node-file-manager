import { cwd } from 'process';
import { join } from 'path';

/**
 *
 * @param {string} path
 * @return {string}
 */
const resolvePath = (path) => {
  const isAbsolutePath = path.startsWith(cwd());

  if (isAbsolutePath) {
    return path;
  } else {
    return join(cwd(), path);
  }
};

export default resolvePath;
