import { basename, join, resolve } from 'path';
import fs, { open, readdir, rename, } from 'fs/promises';
import { chdir, cwd } from 'process';
import logError from '../views/logError.js';
import paint from '../lib/helpers/paint.js';
import { INVALID_INPUT } from '../lib/const/const.js';
import { createReadStream, createWriteStream } from 'fs';

/**
 * Goes up to the directory tree
 * @example up() - home/folder/folder2 -> home/folder
 */
export const up = () => {
  const dirUp = join(cwd(), '..');

  try {
    chdir(dirUp);
  } catch (e) {
    logError();
  }
};

/**
 * Changes the current working directory to the specified path.
 * @param {string} path - The path to change to.
 * @returns {void | never} Nothing.
 * @throws {Error} If the path is invalid or the change fails.
 */
export const cd = (path) => {
  if (!path) return logError(INVALID_INPUT);

  try {
    const newDir = resolve(path);
    chdir(newDir);
  } catch (e) {
    logError();
  }
};

/**
 * Lists the files and directories in the current working directory.
 * @returns {Promise<void>} A promise that resolves when the operation is done.
 * @throws {Error} If the operation fails.
 */
export const ls = async () => {
  try {
    const dirInner = await readdir(cwd(), {
      withFileTypes: true
    });

    const dirs = dirInner.filter(elem => elem.isDirectory()).sort();
    const files = dirInner.filter(elem => elem.isFile()).sort();
    const sortedInner = [ ...dirs, ...files ];

    const tableData = sortedInner.map((elem) => {
      const name = elem.name;
      const type = elem.isFile() ? 'file' : 'directory';
      return { name, type };
    });

    console.table(tableData);
  } catch (e) {
    logError();
  }
};

/**
 * Prints the content of a file to the console.
 * @param {string} path - The path of the file to read.
 * @returns {void} Nothing.
 * @throws {Error} If the path is invalid or the read fails.
 */
export const cat = (path) => {
  if (!path) return logError(INVALID_INPUT);

  try {
    const filePath = resolve(path);

    createReadStream(filePath, { encoding: 'utf-8' })
        .on('data', (chunk) => {
          console.log(paint(chunk.toString(), 'green', 'italic'));
        })
        .on('error', () => logError());
  } catch (e) {
    logError();
  }
};

/**
 * Creates a new file with the given name.
 * @param {string} name - The name of the file to create.
 * @returns {Promise<void>} A promise that resolves when the file is created.
 * @throws {Error} If the name is invalid or the creation fails.
 */
export const add = async (name) => {
  if (!name) return logError(INVALID_INPUT);

  try {
    const fileHandle = await open(name, 'w');
    await fileHandle.close();
  } catch (e) {
    logError();
  }
};

/**
 * Renames a file from the old path to the new path.
 * @param {string} oldPath - The old path of the file to rename.
 * @param {string} newPath - The new path of the file to rename.
 * @returns {Promise<void>} A promise that resolves when the file is renamed.
 * @throws {Error} If the paths are invalid or the rename fails.
 */
export const rn = async (oldPath, newPath) => {
  if (!oldPath || !newPath) return logError(INVALID_INPUT);

  try {
    const oldFile = resolve(oldPath);
    const newFile = resolve(newPath);
    await rename(oldFile, newFile);
  } catch (e) {
    logError();
  }
};

/**
 * Copies a file from the old path to the new path.
 * @param {string} oldPath - The old path of the file to copy.
 * @param {string} newPath - The new path of the file to copy.
 * @returns {stream.Writable} A writable stream that represents the copied file.
 * @throws {Error} If the paths are invalid or the copy fails.
 */
export const cp = (oldPath, newPath) => {
  if (!oldPath || !newPath) return logError(INVALID_INPUT);

  try {
    const oldFile = resolve(oldPath);
    const fileName = basename(oldFile);
    const newFile = join(resolve(newPath), fileName);

    return createReadStream(oldFile)
        .on('error', () => logError())
        .pipe(createWriteStream(newFile))
        .on('error', () => logError());
  } catch (e) {
    logError();
  }
};

/**
 * Removes a file or directory at the specified path.
 * @param {string} path - The path of the file or directory to remove.
 * @returns {Promise<void>} A promise that resolves when the removal is done.
 * @throws {Error} If the path is invalid or the removal fails.
 */
export const rm = async (path) => {
  if (!path) return logError(INVALID_INPUT);

  try {
    await fs.rm(resolve(path));
  } catch (e) {
    logError();
  }
};

/**
 * Moves a file or directory from the old path to the new path.
 * @param {string} oldPath - The old path of the file or directory to move.
 * @param {string} newPath - The new path of the file or directory to move.
 * @returns {void} Nothing.
 * @throws {Error} If the paths are invalid or the move fails.
 */
export const mv = (oldPath, newPath) => {
  if (!oldPath || !newPath) return logError(INVALID_INPUT);

  const oldDest = resolve(oldPath);
  const newDest = resolve(newPath);

  cp(oldDest, newDest)
      ?.on('finish', async () => {
        rm(oldPath);
      });
};
