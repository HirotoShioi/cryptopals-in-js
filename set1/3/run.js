const decryptSingleXOR = require('./challenge3').decryptSingleXOR
const CHALLENGE3_HEX = '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'

console.log('------ Challenge3 ------')
console.log(decryptSingleXOR(CHALLENGE3_HEX).string)
