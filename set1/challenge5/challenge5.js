const keyCharAt = (key, i) => {
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

module.exports = {
  encryptWithKey
};