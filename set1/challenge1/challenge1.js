const hexToBase64 = hex => {
  return Buffer.from(hex, 'hex').toString('base64');
}

module.exports = {
  hexToBase64
};