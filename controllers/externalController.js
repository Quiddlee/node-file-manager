import { createReadStream } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';

export const calcHash = (path) => {
  createReadStream(resolve(path))
      .pipe(
          createHash('sha256')
      )
      .setEncoding('hex')
      .on('data', (data) => console.log(data));
};
