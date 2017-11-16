const xor = require('./challenge2').xor;

const CHALLENGE2_HEX1 = "1c0111001f010100061a024b53535009181c";
const CHALLENGE2_HEX2 = "686974207468652062756c6c277320657965";

console.log("------ Challenge2 ------");
console.log(xor(CHALLENGE2_HEX1,CHALLENGE2_HEX2));