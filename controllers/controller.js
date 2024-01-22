import { join } from 'path';
import { readdir, } from 'fs/promises';
import { chdir, cwd } from 'process';

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
