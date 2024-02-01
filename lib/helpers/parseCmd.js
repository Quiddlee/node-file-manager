const QUOTES = [ '\'', '"', '`' ];

/**
 * @param {string} line - The command line
 * @return {string[]} - The array divided by command line arguments
 */
const parseCmd = (line) => {
  const cmdArgList = [];
  const cmdArg = [];
  const len = line.length - 1;
  let inQuotes = false;

  for (let i = 0; i <= len; i++) {
    const char = line[i];

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
