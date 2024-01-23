import * as os from 'os';

export const eol = () => {
  console.log(JSON.stringify(os.EOL));
};

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

export const homedir = () => {
  console.log(os.homedir());
};
