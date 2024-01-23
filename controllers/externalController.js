import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { createBrotliCompress } from 'zlib';
import logError from '../views/logError.js';

export const calcHash = (path) => {
  try {
    createReadStream(resolve(path))
        .pipe(
            createHash('sha256')
        )
        .setEncoding('hex')
        .on('data', (data) => console.log(data));
  } catch (e) {
    logError();
  }
};

export const compress = (oldPath, newPath) => {
  try {
    const oldFile = resolve(oldPath);
    const newFile = resolve(newPath);

    createReadStream(oldFile)
        .pipe(createBrotliCompress())
        .pipe(createWriteStream(newFile))
        .on('error', logError);
  } catch (e) {
    logError();
  }
};
