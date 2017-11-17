const fs = require('fs')
const decryptSingleXOR = require('../3/challenge3').decryptSingleXOR
/*
* Challenge6
*/

// Split given text into length of SIZE and return array
const createBlocks = (ary, size) => {
  let blocks = []
  const numOfBlocks = Math.ceil(ary.length / size)
  for (let i = 0; i < numOfBlocks; i++) {
    blocks.push(ary.slice(i * size, size * (i + 1)))
  }
  return blocks
}

// const CHALLENGE6_TEXT1 = "this is a test"
// const CHALLENGE6_TEXT2 = "wokka wokka!!!"

const hammingDistance = (str1, str2) => {
  if (str1.length !== str2.length) return

  let distance = 0
  const buf1 = Buffer.from(str1)
  const buf2 = Buffer.from(str2)
  for (let i = 0; i < buf1.length; i++) {
    let buf1Ary = buf1[i].toString(2).split('') // 0's on the front is being omitted
    let buf2Ary = buf2[i].toString(2).split('')
    // Add 0's shorter ones
    if (buf1Ary.length !== buf2Ary.length) {
      const lengthDiff = buf1Ary.length - buf2Ary.length
      const fill = Array(Math.abs(lengthDiff)).fill('0')
      if (lengthDiff > 0) {
        buf2Ary = [...fill, ...buf2Ary]
      } else {
        buf1Ary = [...fill, ...buf1Ary]
      }
    }
    // XOR the bits, if 1, then add distance
    for (let k = 0; k < buf1Ary.length; k++) {
      if ((buf1Ary[k] ^ buf2Ary[k]) === 1) distance++
    }
  }
  return distance
}

const findKeysize = buffer => {
  const START_KEYSIZE = 2
  const END_KEYSIZE = 40
  const NUM_OF_COMPARES = 20

  let normalizedEditDistance = END_KEYSIZE
  let possibleKeysize = START_KEYSIZE

  for (let i = START_KEYSIZE; i <= END_KEYSIZE; i++) {
    let distanceAry = []
    for (let k = 0; k < NUM_OF_COMPARES; k++) {
      let firstByte = buffer.slice(i * k, i * (k + 1))
      let secondByte = buffer.slice(i * (k + 1), i * (k + 2))
      let normalizedDistance = hammingDistance(firstByte, secondByte) / i
      distanceAry.push(normalizedDistance)
    }

    let sumDistance = distanceAry.reduce((prev, curr) => {
      prev += curr
      return prev
    }, 0)

    const averageEditDistance = sumDistance / distanceAry.length

    if (normalizedEditDistance > averageEditDistance) {
      normalizedEditDistance = averageEditDistance
      possibleKeysize = i
    }
  }
  return possibleKeysize
}

const decryptRepeatingKeyXOR = filePath => {
  // read file
  const encryptedFileContent = fs.readFileSync(filePath).toString()

  // decode base64, make buffer
  const base64DecodedData = Buffer.from(encryptedFileContent, 'base64')

  // Find possible keysize
  const possibleKeysize = findKeysize(base64DecodedData)

  // Create blocks with the size length of keysize
  let blocks = []
  blocks = createBlocks(base64DecodedData, possibleKeysize)
  // Transpose blocks
  let max = blocks[0].length
  let transposedBlocks = []
  for (let i = 0; i < max; i++) {
    let block = []
    for (let k = 0; k < blocks.length; k++) {
      block.push(blocks[k][i])
    }
    transposedBlocks.push(Buffer.from(block))
  }

  let key = ''
  transposedBlocks.forEach(block => {
    key += decryptSingleXOR(block).char
  })

  return key
}

module.exports = {
  decryptRepeatingKeyXOR,
  createBlocks
}
