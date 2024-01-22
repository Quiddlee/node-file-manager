import { join } from 'path';
import { open, readdir, rename } from 'fs/promises';
import { chdir, cwd } from 'process';
import { createReadStream } from 'node:fs';
import resolvePath from '../lib/helpers/resolvePath.js';
import { ERROR } from '../const.js';
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
    console.log(paint(ERROR, 'red', 'bold'));
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
  const filePath = resolvePath(path);

  createReadStream(filePath, { encoding: 'utf-8' })
      .on('data', (chunk) => {
        console.log(chunk.toString());
      })
      .on('error', () => console.log(paint(ERROR, 'red', 'bold')));
};

export const add = async (name) => {
  try {
    await open(name, 'w');
  } catch (e) {
    console.log(paint(ERROR, 'red', 'bold'));
  }
};

export const rn = async (oldPath, newPath) => {
  try {
    const oldFile = resolvePath(oldPath);
    const newFile = resolvePath(newPath);
    await rename(oldFile, newFile);
  } catch (e) {
    console.log(paint(ERROR, 'red', 'bold'));
  }
};
