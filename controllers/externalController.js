import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import logError from '../views/logError.js';
import { INVALID_INPUT } from '../lib/const/const.js';

export const hash = (path) => {
  if (!path) return logError(INVALID_INPUT);

  try {
    createReadStream(resolve(path))
        .on('error', () => logError())
        .pipe(
            createHash('sha256')
        )
        .setEncoding('hex')
        .on('data', (data) => console.log(data))
        .on('error', () => logError());
  } catch (e) {
    logError();
  }
};

export const compress = (oldPath, newPath) => {
  if (!oldPath || !newPath) return logError(INVALID_INPUT);

  try {
    const oldFile = resolve(oldPath);
    const newFile = resolve(newPath);

    createReadStream(oldFile)
        .on('error', () => logError())
        .pipe(createBrotliCompress())
        .pipe(createWriteStream(newFile))
        .on('error', () => logError());
  } catch (e) {
    logError();
  }
};

export const decompress = (oldPath, newPath) => {
  if (!oldPath || !newPath) return logError(INVALID_INPUT);
  
  try {
    const oldFile = resolve(oldPath);
    const newFile = resolve(newPath);

    createReadStream(oldFile)
        .on('error', () => logError())
        .pipe(createBrotliDecompress())
        .pipe(createWriteStream(newFile))
        .on('error', () => logError());
  } catch (e) {
    logError();
  }
};

export const exit = () => {
  process.exit();
};
