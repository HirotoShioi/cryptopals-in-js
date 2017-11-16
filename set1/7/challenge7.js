const fs = require('fs');
const crypto = require('crypto');
/*
* Challenge 7
*/

const decryptFileWithAES = (filePath,key) => {
  //read file
  const c7data = fs.readFileSync(filePath).toString();

  //decode base64, make buffer
  const decode = Buffer.from(c7data,'base64');

  //create decipher
	const decipher = crypto.createDecipheriv("aes-128-ecb", new Buffer(key), '');
  
  //decode
	let buf = decipher.update(decode, 'base64');
  buf = Buffer.concat([buf, decipher.final()]);
  
	return buf.toString('utf-8');
};

module.exports = {
  decryptFileWithAES
};