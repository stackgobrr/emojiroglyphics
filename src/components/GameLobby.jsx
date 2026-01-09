import { useState } from 'react'

function GameLobby({ onGameReady }) {
  const [joinKey, setJoinKey] = useState('')
  const [isJoining, setIsJoining] = useState(false)

  const createNewGame = () => {
    // Generate a random 6-character game key
    const key = Math.random().toString(36).substring(2, 8).toUpperCase()
    onGameReady(key)
  }

  const handleJoinGame = (e) => {
    e.preventDefault()
    if (joinKey.trim().length >= 4) {
      onGameReady(joinKey.trim().toUpperCase())
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Emojiroglyphics
        </h1>
        <p style={{
          fontSize: '1.1rem',
          opacity: 0.8,
          lineHeight: 1.6
        }}>
          A 3-player collaborative game where you decode emoji hieroglyphics
        </p>
      </div>

      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div style={{
          backgroundColor: '#16213e',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Create New Game</h2>
          <p style={{ margin: '0 0 1.5rem 0', opacity: 0.8 }}>
            Start a new game and share the key with your friends
          </p>
          <button
            onClick={createNewGame}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Create Game
          </button>
        </div>

        <div style={{
          backgroundColor: '#16213e',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Join Existing Game</h2>
          <p style={{ margin: '0 0 1.5rem 0', opacity: 0.8 }}>
            Enter the game key shared by your friend
          </p>
          <form onSubmit={handleJoinGame}>
            <input
              type="text"
              placeholder="Enter game key"
              value={joinKey}
              onChange={(e) => setJoinKey(e.target.value.toUpperCase())}
              style={{
                width: '100%',
                padding: '1rem',
                marginBottom: '1rem',
                backgroundColor: '#1a1a2e',
                color: '#eee',
                border: '2px solid #0f3460',
                borderRadius: '8px',
                fontSize: '1.1rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
                fontWeight: 'bold'
              }}
              maxLength={8}
            />
            <button
              type="submit"
              disabled={joinKey.trim().length < 4}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: joinKey.trim().length >= 4 ? '#764ba2' : '#444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: joinKey.trim().length >= 4 ? 'pointer' : 'not-allowed',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                opacity: joinKey.trim().length >= 4 ? 1 : 0.5,
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => {
                if (joinKey.trim().length >= 4) {
                  e.target.style.transform = 'scale(1.02)'
                }
              }}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Join Game
            </button>
          </form>
        </div>
      </div>

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#0f3460',
        borderRadius: '8px',
        fontSize: '0.9rem',
        opacity: 0.9
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>How to Play:</h3>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li><strong>Reader:</strong> Sees the encrypted emoji message</li>
          <li><strong>Cipher Holder:</strong> Has the emoji-to-letter key</li>
          <li><strong>Coordinator:</strong> Communicates between players to decode the message</li>
        </ul>
      </div>
    </div>
  )
}

export default GameLobby
