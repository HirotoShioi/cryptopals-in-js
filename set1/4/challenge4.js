const fs = require('fs')
const decryptSingleXOR = require('../3/challenge3').decryptSingleXOR

const decryptFile = filePath => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  // split each line into array
  const fileContentAry = fileContent.split('\n')
  // store the possible solution
  let bestScore = 0
  let possibleSolution = {}

  fileContentAry.forEach(hex => {
    const decrypted = decryptSingleXOR(hex)
    if (bestScore < decrypted.score) {
      bestScore = decrypted.score
      possibleSolution = decrypted
    }
  })

  return possibleSolution
}

module.exports = {
  decryptFile
}
