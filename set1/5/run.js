const encryptWithKey = require('./challenge5').encryptWithKey

const CHALLENGE5_TEXT1 = "Burning 'em, if you ain't quick and nimble I go crazy when I hear a cymbal"
const CHALLENGE5_KEY = 'ICE'

console.log('------ Challenge5 ------')
console.log(encryptWithKey(CHALLENGE5_TEXT1, CHALLENGE5_KEY))
