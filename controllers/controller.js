import { join } from 'path';
import { readdir } from 'fs/promises';
import { chdir, cwd } from 'process';
import { createReadStream } from 'node:fs';
import { ERROR } from '../const.js';

// TODO: handle erros

export const up = () => {
  const dirUp = join(cwd(), '..');
  chdir(dirUp);
};

export const cd = (path) => {
  const newDir = join(cwd(), path);
  chdir(newDir);
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
  let filePath;
  const isAbsolutePath = path.startsWith(cwd());

  if (isAbsolutePath) {
    filePath = path;
  } else {
    filePath = join(cwd(), path);
  }

  createReadStream(filePath, { encoding: 'utf-8' })
      .on('data', (chunk) => {
        console.log(chunk.toString());
      })
      .on('error', () => console.log(ERROR));
};
