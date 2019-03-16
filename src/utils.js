const { readFileSync } = require('fs');

function loadFileIntoList(fPath) {
  const file = readFileSync(fPath, 'utf8');
  const list = file.split('\r\n');
  return list;
};

function printUsageToStdOut() {
    console.log(`useage: \n\tfile <path> path to word list\n\tboggle board <string> 16 char string`);
}

export {
  printUsageToStdOut,
  loadFileIntoList,
};
