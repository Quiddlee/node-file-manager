import paint from '../lib/helpers/paint.js';
import { WAITING } from '../lib/const/const.js';

const logWait = () => {
  console.log(paint(WAITING, 'cyan', 'italic'));
};

export default logWait;
