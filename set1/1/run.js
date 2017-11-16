const hexToBase64 = require('./challenge1').hexToBase64;

const CHALLENGE1_HEX = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";

console.log("------ Challenge1 ------");
console.log(hexToBase64(CHALLENGE1_HEX));