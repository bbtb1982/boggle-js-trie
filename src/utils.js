const { readFileSync } = require('fs');

function loadFileIntoList(fPath) {
  const file = readFileSync(fPath, 'utf8');
  const list = file.split('\r\n');
  return list;
};

function pathToString(path) {
    let str = '';
    for (let i=0; i<path.length; i++) {
      const n = path[i];
      str = `${str}${n ? n.char : ''}`;
    }
    return str;
}

function generateRandomString(string_length){
    let random_string = '';
    let random_ascii;
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
}


export {
  generateRandomString,
  loadFileIntoList,
  pathToString,
};

