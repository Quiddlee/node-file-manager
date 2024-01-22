const styles = {
  bold: '\x1b[1m',
  italic: '\x1b[3m'
};

const colors = {
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

/**
 * Paints the text in specified color & text style.
 *
 * @param {string} text - The text that needs to bes styled.
 * @param {Object.<colors, string>} color - The color in what needs to paint the text.
 * @param {Object.<styles, string>} [style] - The style that needs to apply to the text.
 * @return {string} - Returns the modified string.
 */
const paint = (text, color, style) => {
  const textColor = colors[color];
  const textStyle = styles[style];

  return `${ textColor }${ textStyle }${ text }${ colors.reset }`;
};

export default paint;
