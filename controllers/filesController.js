import { basename, join, resolve } from 'path';
import fs, { open, readdir, rename, } from 'fs/promises';
import { chdir, cwd } from 'process';
import logError from '../views/logError.js';
import paint from '../lib/helpers/paint.js';
import { INVALID_INPUT } from '../lib/const/const.js';
import { createReadStream, createWriteStream } from 'fs';

export const up = () => {
  const dirUp = join(cwd(), '..');

  try {
    chdir(dirUp);
  } catch (e) {
    logError();
  }
};

export const cd = (path) => {
  if (!path) return logError(INVALID_INPUT);

  try {
    const newDir = resolve(path);
    chdir(newDir);
  } catch (e) {
    logError();
  }
};

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

export const add = async (name) => {
  if (!name) return logError(INVALID_INPUT);

  try {
    const fileHandle = await open(name, 'w');
    await fileHandle.close();
  } catch (e) {
    logError();
  }
};

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

export const rm = async (path) => {
  if (!path) return logError(INVALID_INPUT);

  try {
    await fs.rm(resolve(path));
  } catch (e) {
    logError();
  }
};

export const mv = (oldPath, newPath) => {
  if (!oldPath || !newPath) return logError(INVALID_INPUT);

  const oldDest = resolve(oldPath);
  const newDest = resolve(newPath);

  cp(oldDest, newDest)
      ?.on('finish', async () => {
        rm(oldPath);
      });
};
