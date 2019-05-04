/*
  Author: Diego Penteado
*/

getRange = function (string1, string2) {
    if (!string1 || !string2) return 0;
    return Math.floor((Math.max(string1.length, string2.length) / 2) - 1);
}

getJaroWinklerDistance = function (string1, string2) {
    string1 = string1.toLowerCase();
    string2 = string2.toLowerCase();

    if (string1 == string2) return 1;
    
    if (string1.length == 0 || string2.length == 0) return 0;

    let range = getRange(string1, string2);
    let m = 0;
    let string1Chars = new Array(string1.length);
    let string2Chars = new Array(string2.length);
    let string2Indexes = [];

    //MATCHES
    for (let x in string1) {
      for (let y = (Number(x) - range); y <= (Number(x) + range); y++) {
        if (string2[y] && string1[x] === string2[y] && !string1Chars[x] && !string2Chars[y]) {
          string1Chars[x] = true;
          string2Chars[y] = true;
          string2Indexes.push(y);
          m++;
        }
      }
    }

    if (m == 0) return 0;

    //TRANSPOSITIONS
    let transp = 0;
    let menor = -1;
    for (let x in string2Indexes) {
      if (string2Indexes[x] < menor) transp++;

      menor = string2Indexes[x];
    }

    let jaro = ((m / (3 * string1.length)) + (m / (3 * string2.length)) + ((m - transp) / (3 * m)));
    let p = 0.1;
    let l = 0;

    while(string1[l] == string2[l] && l <= 3) {
      l++;
    }

    let jaro_winkler = jaro + l * p * (1 - jaro);

    return jaro_winkler;
}