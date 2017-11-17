const xor = require('../2/challenge2').xor

const calculateScore = string => {
  let score = 0

  const BASE_SCORES = {
    'E': 20,
    'T': 19,
    'A': 18,
    'O': 17,
    'I': 16,
    'N': 15,
    ' ': 14,
    'S': 13,
    'H': 12,
    'R': 11,
    'D': 10,
    'L': 7,
    'U': 8,
    'e': 20,
    't': 19,
    'a': 18,
    'o': 17,
    'i': 16,
    'n': 15,
    's': 13,
    'h': 12,
    'r': 11,
    'd': 10,
    'l': 7,
    'u': 8
  }

  Array.prototype.forEach.call(string, s => {
    if (BASE_SCORES[s] !== undefined) score += BASE_SCORES[s]
  })

  return score
}

const decryptSingleXOR = hex => {
  let highest = {
    score: 0,
    char: 0,
    string: ''
  }
  const START_ASCII = 0
  const END_ASCII = 127
  for (let i = START_ASCII; i < END_ASCII; i++) {
    // convert ascii to hex and make it same length as argument
    const singleByte = Buffer.from(i.toString(16).repeat(hex.length), 'hex')
    // calculate the score
    const xored = xor(hex, singleByte)
    const currScore = calculateScore(xored)
    // if the score is higher, replace
    if (highest.score < currScore) {
      highest = {
        score: currScore,
        char: String.fromCharCode(i),
        string: xored
      }
    }
  }
  return highest
}

module.exports = {
  decryptSingleXOR
}
