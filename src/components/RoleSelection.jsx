import { useEffect } from 'react'
import { generateCipher, getRandomMessage, encryptMessage } from '../utils/cipher'

function RoleSelection({ gameKey, onSelectRole, gameState, setGameState }) {
  // Initialize game when component mounts (only once per game key)
  useEffect(() => {
    if (!gameState.cipher) {
      const { cipher, reverseCipher } = generateCipher()
      const message = getRandomMessage()
      const encrypted = encryptMessage(message, cipher)

      setGameState(prev => ({
        ...prev,
        cipher,
        reverseCipher,
        currentMessage: message,
        encryptedMessage: encrypted,
        isGameActive: true
      }))
    }
  }, [gameKey])

  const roles = [
    {
      id: 'reader',
      title: 'Reader',
      emoji: '📖',
      description: 'You see the encrypted emoji message',
      color: '#667eea'
    },
    {
      id: 'cipher',
      title: 'Cipher Holder',
      emoji: '🔑',
      description: 'You have the key to decode the emojis',
      color: '#f093fb'
    },
    {
      id: 'coordinator',
      title: 'Coordinator',
      emoji: '🎯',
      description: 'You communicate between the Reader and Cipher Holder',
      color: '#4facfe'
    }
  ]

  const handleSelectRole = (roleId) => {
    // Mark this role as taken
    setGameState(prev => ({
      ...prev,
      players: {
        ...prev.players,
        [roleId]: true
      }
    }))
    onSelectRole(roleId)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>Choose Your Role</h1>
        <p style={{
          fontSize: '1rem',
          opacity: 0.8,
          margin: '0 0 1rem 0'
        }}>
          Game Key: <code style={{
            backgroundColor: '#16213e',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>{gameKey}</code>
        </p>
        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          Share this key with other players so they can join
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        width: '100%'
      }}>
        {roles.map(role => {
          const isTaken = gameState.players[role.id]
          return (
            <button
              key={role.id}
              onClick={() => !isTaken && handleSelectRole(role.id)}
              disabled={isTaken}
              style={{
                backgroundColor: '#16213e',
                border: `3px solid ${isTaken ? '#444' : role.color}`,
                borderRadius: '12px',
                padding: '2rem',
                cursor: isTaken ? 'not-allowed' : 'pointer',
                opacity: isTaken ? 0.5 : 1,
                transition: 'all 0.3s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                if (!isTaken) {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 8px 16px ${role.color}40`
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {isTaken && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: '#e94560',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  TAKEN
                </div>
              )}
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                {role.emoji}
              </div>
              <h3 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.5rem',
                color: isTaken ? '#888' : role.color
              }}>
                {role.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                opacity: 0.8,
                lineHeight: 1.5
              }}>
                {role.description}
              </p>
            </button>
          )
        })}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1rem',
        backgroundColor: '#0f3460',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '0.9rem',
        opacity: 0.9
      }}>
        <p style={{ margin: 0 }}>
          💡 Tip: All players need to select their roles before the game begins
        </p>
      </div>
    </div>
  )
}

export default RoleSelection
