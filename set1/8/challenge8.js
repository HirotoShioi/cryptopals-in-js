const fs = require('fs');
const createBlocks = require('../6/challenge6').createBlocks;
/*
    Challenge 8
*/

// Compare each block, return number of same blocks
const compareBlocks = blocks => {
  let sameBlockCnt = 0;

  blocks.forEach((block, index) =>{
    for(i = 0; i < blocks.length; i ++){
      if(index == i) continue;
      if (Buffer.compare(block, blocks[i]) == 0) {
        sameBlockCnt++;
      }
    }
  });

  return sameBlockCnt;
}
//Read the file and return possible ECB encrypted text
const detectAESinECB = filePath => {
  const ciphers = fs.readFileSync(filePath,'utf-8');
  cipherArray = ciphers.split("\n").map(line => {
    return Buffer.from(line);
  });

  const size = 16;
  let possibleECBs = [];
  cipherArray.forEach((cipherText,lineNum) => {
    //Split in to 16 bites
    const blocks = createBlocks(cipherText, size);

    //Verify if there's any bsame blocks
    const sameBlockCnt = compareBlocks(blocks);
    if(sameBlockCnt > 0) possibleECBs.push({sameBlockCnt, lineNum, content: Buffer.from(cipherText).toString()});
  });
  return (possibleECBs.length == 1)? possibleECBs[0] : possibleECBs;
}

module.exports = {
  detectAESinECB
};