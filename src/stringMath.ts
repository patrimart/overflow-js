
// const arr = new Uint8Array([0x6, 0x6]);
// const map = ["1", "16", "32", "64", "128", "256", "512", "1024", "2048"].map(a => new Uint8Array(a.split('').reverse()));

// // console.log(arr, map, 0x66, 0x6, 0x60, 0xf);

// console.log(parseString('777777'), parseString('-929222'));
// let addResult = addStrings(parseString('777777'), parseString('-929222'));
// console.log("ADD =>", 777777-229222, addResult, toString(addResult));


// console.log("MULT =>", 363 * 55, multiString(parseString('363'), parseString('55')));



function parseString (str) {
  const a = new Int8Array(str.length);
  let ii = 0;
  let multi = str[0] === '-' ? -1 : 1;
  for (let i=str.length-1; i >= 0; i--) a[ii++] = (parseInt(str[i]) | 0) * multi;
  return a;
}

function addStrings (a, b) {
  
  let i = 0;
  let result = new Int8Array(Math.max(a.length, b.length) + 1);
  while (a[i] !== undefined || b[i] !== undefined) {
    
    result[i] = (a[i] | 0) + (b[i] | 0) + (result[i] | 0);
    if (result[i] > 9) {
      result[i] = result[i] % 10;
      result[i+1] = 1;
    } else if (result[i] < 0) {
      result[i] += 10;
      result[i+1]--;
    }
    i++;
  }
  
  return trim(normalize(result));
}

function multiString (a, b) {
  
  let finalResult = new Int8Array(Math.max(a.length, b.length) * 2 + 1);
  
  let ii = 0;
  while (b[ii] !== undefined) {

    let i = 0;
    let carryOver = 0;
    let result = new Int8Array(Math.max(a.length, b.length) + 2 + ii);
    while (a[i] !== undefined) {
      result[i+ii] = Math.abs((a[i] | 0) * (b[ii] | 0)) + carryOver;
      if (result[i+ii] < 9 && result[i+ii] > -9) {
        carryOver = 0;
      } else {
        carryOver = (result[i+ii] / 10) | 0;
        result[i+ii] -= carryOver * 10;
      }
      i++;
    }
    result[i+ii] += carryOver;
    
    console.log(result);

    finalResult = addStrings(result, finalResult);
    ii++;
  }
  // Determine if finalResult is negative.
  return trim(finalResult);
}

function trim (arr) {
  
  let end = arr.length;
  while (end-- && arr[end] === 0);
  return arr.slice(0, end + 1);
}

function normalize (arr) {
  if (arr[arr.length-1] !== -1) return arr;
  arr = arr.slice(0, arr.length-1);
  arr[0] -= 10;
  for (let i=1; i < arr.length; i++) arr[i] -= 9;
  return arr;
}

function toString (arr) {
  
  return (arr[0] < 0 ? "-" : "") + arr.map(Math.abs).join("");
}
