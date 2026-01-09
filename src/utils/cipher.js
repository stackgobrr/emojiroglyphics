// Meaningful emoji mappings where emoji represents a word, and we use combinations
// Monograms: single emoji word's first letter = one letter
// Digrams: two emoji words' first letters = two letters
// Trigrams: three emoji words' first letters = three letters

const EMOJI_WORDS = [
  // Animals
  { emoji: '🐱', word: 'CAT' },
  { emoji: '🐕', word: 'DOG' },
  { emoji: '🦊', word: 'FOX' },
  { emoji: '🐝', word: 'BEE' },
  { emoji: '🦇', word: 'BAT' },
  { emoji: '🦉', word: 'OWL' },
  { emoji: '🐷', word: 'PIG' },
  { emoji: '🐄', word: 'COW' },
  { emoji: '🐑', word: 'RAM' },
  { emoji: '🦁', word: 'LION' },
  { emoji: '🐻', word: 'BEAR' },
  { emoji: '🐺', word: 'WOLF' },
  { emoji: '🦅', word: 'EAGLE' },
  { emoji: '🐍', word: 'SNAKE' },
  // Nature
  { emoji: '☀️', word: 'SUN' },
  { emoji: '🌙', word: 'MOON' },
  { emoji: '⭐', word: 'STAR' },
  { emoji: '🔥', word: 'FIRE' },
  { emoji: '💧', word: 'DROP' },
  { emoji: '🌊', word: 'WAVE' },
  { emoji: '⚡', word: 'BOLT' },
  { emoji: '🌈', word: 'RAINBOW' },
  // Plants
  { emoji: '🌹', word: 'ROSE' },
  { emoji: '🌸', word: 'FLOWER' },
  { emoji: '🌻', word: 'SUNFLOWER' },
  { emoji: '🌺', word: 'HIBISCUS' },
  { emoji: '🌷', word: 'TULIP' },
  { emoji: '🌳', word: 'TREE' },
  { emoji: '🌴', word: 'PALM' },
  // Objects
  { emoji: '🔑', word: 'KEY' },
  { emoji: '👑', word: 'CROWN' },
  { emoji: '💎', word: 'GEM' },
  { emoji: '⚔️', word: 'SWORD' },
  { emoji: '🏺', word: 'URN' },
  { emoji: '🗡️', word: 'DAGGER' },
  { emoji: '🛡️', word: 'SHIELD' },
  // Food
  { emoji: '🍎', word: 'APPLE' },
  { emoji: '🍊', word: 'ORANGE' },
  { emoji: '🍋', word: 'LEMON' },
  { emoji: '🍌', word: 'BANANA' },
  { emoji: '🍇', word: 'GRAPE' },
]

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Generate a cipher using hieroglyphic-style combinations
export function generateCipher() {
  const cipher = {}
  const reverseCipher = {}

  // Shuffle emoji pool
  const shuffledEmojis = [...EMOJI_WORDS].sort(() => Math.random() - 0.5)
  let emojiIndex = 0

  // Assign glyphs to each letter based on frequency
  // Most common letters get monograms (single emoji)
  // Less common get digrams (2 emojis)
  // Least common get trigrams (3 emojis)

  const lettersByFrequency = ['E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z']

  lettersByFrequency.forEach((letter, index) => {
    let glyph

    if (index < 9) {
      // Most common letters: monogram (first letter of emoji word)
      const { emoji, word } = shuffledEmojis[emojiIndex % shuffledEmojis.length]
      glyph = emoji
      emojiIndex++
    } else if (index < 18) {
      // Common letters: digram (first letters of 2 emoji words)
      const emoji1 = shuffledEmojis[emojiIndex % shuffledEmojis.length]
      const emoji2 = shuffledEmojis[(emojiIndex + 1) % shuffledEmojis.length]
      glyph = emoji1.emoji + emoji2.emoji
      emojiIndex += 2
    } else {
      // Rare letters: trigram (first letters of 3 emoji words)
      const emoji1 = shuffledEmojis[emojiIndex % shuffledEmojis.length]
      const emoji2 = shuffledEmojis[(emojiIndex + 1) % shuffledEmojis.length]
      const emoji3 = shuffledEmojis[(emojiIndex + 2) % shuffledEmojis.length]
      glyph = emoji1.emoji + emoji2.emoji + emoji3.emoji
      emojiIndex += 3
    }

    cipher[letter] = glyph
    reverseCipher[glyph] = letter
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
// Handles multi-emoji glyphs (trigrams, digrams, monograms)
export function decryptMessage(encryptedMessage, reverseCipher) {
  let decrypted = ''
  let i = 0

  // Get all possible glyph lengths and sort longest first
  const glyphsByLength = Object.keys(reverseCipher)
    .map(glyph => ({ glyph, length: glyph.length }))
    .sort((a, b) => b.length - a.length)

  while (i < encryptedMessage.length) {
    // Check for full-width space
    if (encryptedMessage[i] === '　') {
      decrypted += ' '
      i++
      continue
    }

    // Try to match glyphs from longest to shortest
    let matched = false
    for (const { glyph, length } of glyphsByLength) {
      if (i + length <= encryptedMessage.length) {
        const substring = encryptedMessage.substring(i, i + length)
        if (substring === glyph) {
          decrypted += reverseCipher[glyph]
          i += length
          matched = true
          break
        }
      }
    }

    if (!matched) {
      // Keep unmatched character
      decrypted += encryptedMessage[i]
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
