const { readFileSync } = require('fs');

function loadFileIntoList(fPath) {
  const file = readFileSync(fPath, 'utf8');
  const list = file.split('\r\n');
  return list;
};

export {
  loadFileIntoList,
};
