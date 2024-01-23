import { basename, join, resolve } from 'path';
import { open, readdir, rename, rm } from 'fs/promises';
import { chdir, cwd } from 'process';
import { createReadStream, createWriteStream } from 'node:fs';
import logError from '../views/logError.js';
import paint from '../lib/helpers/paint.js';

// TODO: handle errors

export const up = () => {
  const dirUp = join(cwd(), '..');
  chdir(dirUp);
};

export const cd = (path) => {
  const newDir = join(cwd(), path);
  try {
    chdir(newDir);
  } catch (e) {
    logError();
  }
};

export const ls = async () => {
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
};

export const cat = (path) => {
  const filePath = resolve(path);

  createReadStream(filePath, { encoding: 'utf-8' })
      .on('data', (chunk) => {
        console.log(paint(chunk.toString(), 'green', 'italic'));
      })
      .on('error', logError);
};

export const add = async (name) => {
  try {
    await open(name, 'w');
  } catch (e) {
    logError();
  }
};

export const rn = async (oldPath, newPath) => {
  try {
    const oldFile = resolve(oldPath);
    const newFile = resolve(newPath);
    await rename(oldFile, newFile);
  } catch (e) {
    logError();
  }
};

export const cp = (oldPath, newPath) => {
  const oldFile = resolve(oldPath);
  const fileName = basename(oldFile);
  const newFile = join(resolve(newPath), fileName);

  return createReadStream(oldFile)
      .on('error', logError)
      .pipe(createWriteStream(newFile))
      .on('error', logError);
};

export const mv = (oldPath, newPath) => {
  cp(oldPath, newPath)
      .on('finish', () => {
        rm(oldPath);
      });
};
