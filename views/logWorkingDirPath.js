const logWorkingDirPath = () => {
  const workingDirPath = process.cwd();
  console.log(`You are currently in ${ workingDirPath }`);
};

export default logWorkingDirPath;
