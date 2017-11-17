const PKCS7 = require('./challenge9').PKCS7

const text = 'YELLOW SUBMARINE'
const paddingLength = 4

// You cannot see them on the console but the \x04 are actually being added
console.log(PKCS7(text, paddingLength))
