const fs = require('fs');
const crypto = require('crypto');


/* 
* Challenge 1
*/
const CHALLENGE1_HEX = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";

const hexToBase64 = hex => {
  return Buffer.from(hex, 'hex').toString('base64');
}

//console.log("------ Challenge1 ------");
//console.log(hexToBase64(CHALLENGE1_HEX));

/*
* Challenge 2
*/
const CHALLENGE2_HEX1 = "1c0111001f010100061a024b53535009181c";
const CHALLENGE2_HEX2 = "686974207468652062756c6c277320657965";

const xor = (a, b) => {
  if (!Buffer.isBuffer(a)) a = Buffer.from(a,"hex");
  if (!Buffer.isBuffer(b)) b = Buffer.from(b,"hex");
  var res = []
  if (a.length > b.length) {
    for (var i = 0; i < b.length; i++) {
       res.push(a[i] ^ b[i])
    }
 } else {
 for (var i = 0; i < a.length; i++) {
   res.push(a[i] ^ b[i])
   }
 }
 return Buffer.from(res,"hex").toString("utf-8");
}

//console.log("\n------ Challenge2 ------");
//console.log(xor(CHALLENGE2_HEX1,CHALLENGE2_HEX2));

/*
* Challenge 3
*/
const CHALLENGE3_HEX = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736";

const calculateScore = string => {
  let score = 0;

  const BASE_SCORES = {
    "E": 20, "T": 19, "A": 18, "O": 17, "I": 16, "N": 15, " ": 14, "S": 13, "H": 12, "R": 11, "D": 10, "L": 7, "U": 8,
    "e": 20, "t": 19, "a": 18, "o": 17, "i": 16, "n": 15, " ": 14, "s": 13, "h": 12, "r": 11, "d": 10, "l": 7, "u": 8
  };

  Array.prototype.forEach.call(string, s => {
    if(BASE_SCORES[s] != undefined) score += BASE_SCORES[s];
  });

  return score;
};

const decrypt = hex => {

  let highest = {
    score:0,
    char:0,
    string: ""
  };
  const START_ASCII = 0;
  const END_ASCII = 127;

  for(i = START_ASCII; i < END_ASCII; i++){
    //convert ascii to hex and make it same length as argument
    const singleByte = Buffer.from(i.toString(16).repeat(hex.length), 'hex');
    //calculate the score
    const xored = xor(hex, singleByte);
    const currScore = calculateScore(xored);
    //if the score is higher, replace
    if(highest.score < currScore){
      highest = {
        score: currScore,
        char: String.fromCharCode(i),
        string:xored
      }
    }

  }
  return highest;
}
//console.log("\n------ Challenge3 ------");
//console.log(decrypt(CHALLENGE3_HEX));

/*
 Challenge 4
*/
const decryptFile = filePath =>{
  const fileContent = fs.readFileSync(filePath,'utf-8');
  //split each line into array
  const fileContentAry = fileContent.split('\n');
  //store the possible solution
  let bestScore = 0;
  let possibleSolution = {}

  fileContentAry.forEach(hex => {
    const decrypted = decrypt(hex);
    if (bestScore  < decrypted.score) {
      bestScore = decrypted.score;
      possibleSolution = decrypted;
    }
  });

  return possibleSolution;
}

//console.log("\n------ Challenge4 ------");
//console.log(decryptFile('./files/4.txt'));

/*
  Challenge 5
*/

const CHALLENGE5_TEXT1 = "Burning 'em, if you ain't quick and nimble I go crazy when I hear a cymbal";
const CHALLENGE5_KEY = "ICE";

function keyCharAt(key, i) {
  return key.charCodeAt( Math.floor(i % key.length) );
}

const encryptWithKey = (text, key) => {
  let res = [];
  const hexedText = Buffer.from(text);

  for (var i = 0; i < hexedText.length; i++) {
    res.push(hexedText[i] ^ keyCharAt(key,i));
  }
  return Buffer.from(res).toString("hex");
}

//console.log("\n------ Challenge5 ------");
//console.log(encryptWithKey(CHALLENGE5_TEXT1, CHALLENGE5_KEY));

/*
* Challenge 7
*/

const CHALLENGE7_KEY = "YELLOW SUBMARINE";

const decryptFileWithAES = (filePath,key) => {
  //read file
  const c7data = fs.readFileSync(filePath).toString();

  //decode base64, make buffer
  const decode = Buffer.from(c7data,'base64');

  //create decipher
	const cipher = crypto.createDecipheriv("aes-128-ecb", new Buffer(key), '');
  cipher.setAutoPadding(false);
  
  //decode
	let buf = cipher.update(decode, 'base64');
  buf = Buffer.concat([buf, cipher.final()]);
  
	return buf.toString('utf-8');
};
//console.log("\n------ Challenge7 ------");
// console.log(decryptFileWithAES('./files/7.txt', CHALLENGE7_KEY));

/*
    Challenge 8
*/

//It is done but need a lot of refactoring!!
const detectAESinECB = filePath => {
  const ciphers = fs.readFileSync(filePath,'utf-8');
  cipherArray = ciphers.split("\n").map(line => {
    return Buffer.from(line);
  });

  const size = 16;
  let sameBlockNumAry = []
  cipherArray.forEach((cipher,textNum) => {
    //16 文字ごとに分ける
    let blocks = [];
    const numOfBlocks = Math.ceil(cipher.length / size);
    for(i = 0; i < numOfBlocks; i++){
      blocks.push(cipher.slice(i*size, size*(i+1)));
    }

    //Blockごとに同じものがあるか検証する
    let sameBlockNum = 0;
    blocks.forEach((block, index) =>{
      for(i = 0; i < blocks.length; i ++){
        if(index == i) continue;
        if (Buffer.compare(block, blocks[i]) == 0) {
          sameBlockNum++;
        }
      }
    });
    if(sameBlockNum > 0) sameBlockNumAry.push({sameBlockNum:sameBlockNum, line:textNum, sentence:Buffer.from(cipher).toString()});
  });
  return sameBlockNumAry;
}

console.log("\n------ Challenge8 ------");
console.log(detectAESinECB('./files/8.txt'));