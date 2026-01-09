// Pool of emojis for the cipher
const EMOJI_POOL = [
  '🌟', '🌙', '⭐', '✨', '🔥', '💧', '🌊', '⚡',
  '🌈', '☀️', '🌸', '🌺', '🌻', '🌹', '🌷', '🌴',
  '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍑',
  '🦁', '🐯', '🐻', '🐼', '🐨', '🐸'
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Generate a random cipher mapping
export function generateCipher() {
  const shuffledEmojis = [...EMOJI_POOL].sort(() => Math.random() - 0.5)
  const cipher = {}
  const reverseCipher = {}

  ALPHABET.forEach((letter, index) => {
    const emoji = shuffledEmojis[index]
    cipher[letter] = emoji
    reverseCipher[emoji] = letter
  })

  return { cipher, reverseCipher }
}

// Encrypt a message using the cipher
export function encryptMessage(message, cipher) {
  return message
    .toUpperCase()
    .split('')
    .map(char => {
      if (char === ' ') return '　' // Use full-width space for visual separation
      if (ALPHABET.includes(char)) return cipher[char]
      return char // Keep punctuation as-is
    })
    .join('')
}

// Decrypt a message using the reverse cipher
export function decryptMessage(encryptedMessage, reverseCipher) {
  let decrypted = ''
  let i = 0

  while (i < encryptedMessage.length) {
    // Check for full-width space
    if (encryptedMessage[i] === '　') {
      decrypted += ' '
      i++
      continue
    }

    // Try to match emoji (emojis can be 1-2 chars due to unicode)
    let emoji = encryptedMessage[i]
    if (i + 1 < encryptedMessage.length) {
      const twoChar = encryptedMessage.substring(i, i + 2)
      if (reverseCipher[twoChar]) {
        decrypted += reverseCipher[twoChar]
        i += 2
        continue
      }
    }

    if (reverseCipher[emoji]) {
      decrypted += reverseCipher[emoji]
      i++
    } else {
      decrypted += emoji // Keep non-cipher characters
      i++
    }
  }

  return decrypted
}

// Sample messages for the game
export const SAMPLE_MESSAGES = [
  "HELLO WORLD",
  "THE QUICK BROWN FOX",
  "SECRET MESSAGE",
  "DECODE THIS NOW",
  "TEAMWORK WINS",
  "EMOJI PUZZLE",
  "CRACK THE CODE",
  "HIDDEN TREASURE",
  "MYSTERY SOLVED",
  "VICTORY AWAITS"
]

// Get a random message
export function getRandomMessage() {
  return SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)]
}

// Rotate cipher by shifting emoji assignments
export function rotateCipher(cipher) {
  const letters = Object.keys(cipher)
  const emojis = letters.map(l => cipher[l])

  // Shift emojis by 1 position
  const rotatedEmojis = [emojis[emojis.length - 1], ...emojis.slice(0, -1)]

  const newCipher = {}
  const newReverseCipher = {}

  letters.forEach((letter, index) => {
    const emoji = rotatedEmojis[index]
    newCipher[letter] = emoji
    newReverseCipher[emoji] = letter
  })

  return { cipher: newCipher, reverseCipher: newReverseCipher }
}
