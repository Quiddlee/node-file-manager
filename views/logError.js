import paint from '../lib/helpers/paint.js';
import { ERROR } from '../const.js';

const logError = () => {
  console.log(paint(ERROR, 'red', 'bold'));
};

export default logError;
