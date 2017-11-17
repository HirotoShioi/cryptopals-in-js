const fs = require('fs')
const crypto = require('crypto')

const decryptCBCEncryptedFile = (filePath, key, iv) => {
  // read file
  const data = fs.readFileSync(filePath).toString()

    // decode base64, make buffer
  const decode = Buffer.from(data, 'base64')

  // create decipher
  const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key), Buffer.from(iv.repeat(16)))

  // decode
  let buf = decipher.update(decode, 'base64')
  buf = Buffer.concat([buf, decipher.final()])

  return buf.toString('utf-8')
}

module.exports = {
  decryptCBCEncryptedFile
}
