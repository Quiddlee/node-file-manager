import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { createHash } from 'crypto';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import logError from '../views/logError.js';
import { INVALID_INPUT } from '../lib/const/const.js';

/**
 * Computes the SHA-256 hash of a file and prints it to the console.
 * @param {string} path - The path of the file to hash.
 * @returns {Promise<void>} Nothing.
 * @throws {Error} If the path is invalid or the hashing fails.
 */
export const hash = async (path) => {
  if (!path) return logError(INVALID_INPUT);

  try {
    return new Promise(res =>
        createReadStream(resolve(path))
            .on('error', () => {
              logError();
              res();
            })
            .pipe(
                createHash('sha256')
            )
            .setEncoding('hex')
            .on('data', (data) => console.log(data))
            .on('error', () => logError())
            .on('close', res));
  } catch (e) {
    logError();
  }
};

/**
 * Compresses a file using Brotli algorithm.
 * @param {string} oldPath - The path of the file to compress.
 * @param {string} newPath - The path of the compressed file to write.
 * @returns {void} Nothing.
 * @throws {Error} If the paths are invalid or the compression or writing fails.
 */
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

/**
 * Decompresses a file using Brotli algorithm.
 * @param {string} oldPath - The path of the compressed file to decompress.
 * @param {string} newPath - The path of the decompressed file to write.
 * @returns {void} Nothing.
 * @throws {Error} If the paths are invalid or the decompression or writing fails.
 */
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

/**
 * Exits the current process.
 * @returns {void} Nothing.
 */
export const exit = () => {
  process.exit();
};
