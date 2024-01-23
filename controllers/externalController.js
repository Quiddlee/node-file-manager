import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import logError from '../views/logError.js';

export const calcHash = (path) => {
  try {
    createReadStream(resolve(path))
        .on('error', logError)
        .pipe(
            createHash('sha256')
        )
        .setEncoding('hex')
        .on('data', (data) => console.log(data))
        .on('error', logError);
  } catch (e) {
    logError();
  }
};

export const compress = (oldPath, newPath) => {
  try {
    const oldFile = resolve(oldPath);
    const newFile = resolve(newPath);

    createReadStream(oldFile)
        .on('error', logError)
        .pipe(createBrotliCompress())
        .pipe(createWriteStream(newFile))
        .on('error', logError);
  } catch (e) {
    logError();
  }
};

export const decompress = (oldPath, newPath) => {
  try {
    const oldFile = resolve(oldPath);
    const newFile = resolve(newPath);

    createReadStream(oldFile)
        .on('error', logError)
        .pipe(createBrotliDecompress())
        .pipe(createWriteStream(newFile))
        .on('error', logError);
  } catch (e) {
    logError();
  }
};

export const exit = () => {
  process.exit();
};
