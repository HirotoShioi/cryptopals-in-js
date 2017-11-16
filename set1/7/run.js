const decryptFileWithAES = require('./challenge7').decryptFileWithAES;

const CHALLENGE7_KEY = "YELLOW SUBMARINE";
console.log("------ Challenge7 ------");
console.log(decryptFileWithAES('../../files/7.txt', CHALLENGE7_KEY));