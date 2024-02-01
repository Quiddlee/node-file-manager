import parseCmd from './parseCmd.js';

/**
 * Parses the command line and returns the argument from the given index
 *
 * @param {string} line - The command line that user sent
 * @param {number} index - The index of the argument that you want to get from the
 * @returns {string | undefined} - Returns the part of the command line if the index part exist
 */
const getCmdPart = (line, index = 0) => {
  return parseCmd(line).at(index);
};

export default getCmdPart;
