const PKCS7 = (str, paddingLength) => {
  const padding = Buffer.from('\x04'.repeat(paddingLength))
  const bufStr = Buffer.from(str)

  return Buffer.concat([bufStr, padding]).toString()
}

module.exports = {
  PKCS7
}
