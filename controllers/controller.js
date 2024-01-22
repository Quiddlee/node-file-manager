import { join } from 'path';

export const up = () => {
  const dirUp = join(process.cwd(), '..');
  process.chdir(dirUp);
};
