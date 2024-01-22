import { join } from 'path';

export const up = () => {
  const dirUp = join(process.cwd(), '..');
  process.chdir(dirUp);
};

export const cd = (path) => {
  const newDir = join(process.cwd(), path);
  process.chdir(newDir);
};
