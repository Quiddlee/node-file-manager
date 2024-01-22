import paint from '../lib/helpers/paint.js';

const logWorkingDirPath = () => {
  const workingDirPath = process.cwd();
  console.log(`📂 You are currently in ${ paint(workingDirPath, 'green', 'bold') }`);
};

export default logWorkingDirPath;
