const getCmdPart = (line, index = 0) => {
  return line.split(' ').at(index);
};

export default getCmdPart;
