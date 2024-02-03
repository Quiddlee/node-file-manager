import * as os from 'os';

/**
 * Prints the end-of-line marker for the current operating system.
 * @returns {void} Nothing.
 */
export const eol = () => {
  console.log(JSON.stringify(os.EOL));
};

/**
 * Prints the information about the CPUs of the current machine.
 * @returns {void} Nothing.
 */
export const cpus = () => {
  const cpuData = os.cpus();

  const tableData = cpuData.map(cpu => {
    const cpuClockGHz = (cpu.speed / 1000).toFixed(1);

    return {
      'Model': cpu.model,
      'Clock rate': `${ cpuClockGHz }GHz`
    };
  });

  const half = Math.floor(tableData.length / 2); 
  tableData.at(half)['Amount of CPUS'] = cpuData.length;

  console.table(tableData);
};

/**
 * Prints the home directory of the current user.
 * @returns {void} Nothing.
 */
export const homedir = () => {
  console.log(os.homedir());
};

/**
 * Prints the username of the current user.
 * @returns {void} Nothing.
 */
export const username = () => {
  console.log(os.userInfo().username);
};

/**
 * Prints the architecture of the current operating system.
 * @returns {void} Nothing.
 */
export const architecture = () => {
  console.log(os.arch());
};
