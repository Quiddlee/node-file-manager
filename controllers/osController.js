import * as os from 'os';

export const eol = () => {
  console.log(JSON.stringify(os.EOL));
};
