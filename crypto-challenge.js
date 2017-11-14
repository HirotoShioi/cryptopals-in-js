// Challenge 1
const CHALLENGE1_HEX = "49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d";

const hexToBase64 = hex => {
  return new Buffer(hex, 'hex').toString('base64');
}
//console.log(hexToBase64(CHALLENGE1_HEX));

//Challenge 2
const CHALLENGE2_HEX1 = "1c0111001f010100061a024b53535009181c";
const CHALLENGE2_HEX2 = "686974207468652062756c6c277320657965";

const xor = (a, b) => {
  if (!Buffer.isBuffer(a)) a = new Buffer(a,"hex");
  if (!Buffer.isBuffer(b)) b = new Buffer(b,"hex");
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
 return new Buffer(res).toString("utf-8");
}

//console.log(xor(CHALLENGE2_HEX1,CHALLENGE2_HEX2));

//Challenge 3
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

//console.log(decrypt(CHALLENGE3_HEX));