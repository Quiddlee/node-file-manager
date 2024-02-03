const QUOTES = [ '\'', '"', '`' ];

/**
 * Parses the cmd command line and splits it into array of arguments
 * @param {string} line - The command line
 * @return {string[]} - The array divided by command line arguments
 * @example cd folde1/folder2 someArg -> ['cd', 'folder1/folder2', 'someArg']
 */
const parseCmd = (line) => {
  const cmdArgList = [];
  const cmdArg = [];
  let inQuotes = false;

  for (const char of line) {
    if (QUOTES.includes(char)) {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ' ' && !inQuotes) {
      cmdArgList.push(cmdArg.join(''));
      cmdArg.length = 0;
    } else {
      cmdArg.push(char);
    }
  }

  cmdArgList.push(cmdArg.join(''));
  return cmdArgList;
};

export default parseCmd;
