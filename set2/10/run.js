const key = 'YELLOW SUBMARINE'
const iv = '0'
const decryptCBCEncryptedFile = require('./challenge10').decryptCBCEncryptedFile

console.log(decryptCBCEncryptedFile('../../files/10.txt', key, iv))
