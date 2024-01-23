import paint from '../lib/helpers/paint.js';
import { ERROR } from '../lib/const/const.js';

const logError = (message) => {
  console.log(paint(message ?? ERROR, 'red', 'bold'));
};

export default logError;
