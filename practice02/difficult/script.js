'use strict';

const palindrom = (str) => {
  let newStr = '';

  const halfStr = Math.floor(str.length / 2);

  if (str.length % 2 != 0) {
    newStr = str[halfStr];

    for (let i = 1; i <= halfStr; i++) {
      if (str[halfStr - i] == str[halfStr + i]) {
        newStr = str[halfStr - i] + newStr + str[halfStr + i];
      } else {
        break;
      }
    }
  } else {
    for (let i = 1; i <= halfStr; i++) {
      if (str[halfStr - i] == str[halfStr + i - 1]) {
        newStr = str[halfStr - i] + newStr + str[halfStr + i - 1];
      } else {
        break;
      }
    }
  }
  return newStr;
};

console.log(palindrom('fffkffgffkfdk'));
console.log(palindrom('абвгоогвфф'));

