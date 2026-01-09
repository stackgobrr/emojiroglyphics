import { useState } from 'react'

function CoordinatorView({ gameState, setGameState }) {
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!guess.trim()) return

    const isCorrect = guess.trim().toUpperCase() === gameState.currentMessage

    const newAttempt = {
      guess: guess.trim(),
      isCorrect,
      timestamp: new Date().toLocaleTimeString()
    }

    setAttempts(prev => [...prev, newAttempt])

    if (isCorrect) {
      // Game won!
      setGameState(prev => ({
        ...prev,
        gameWon: true
      }))
    }

    setGuess('')
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#16213e',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '2rem', marginRight: '1rem' }}>🎯</span>
          <div>
            <h2 style={{ margin: 0, color: '#4facfe' }}>Coordinator</h2>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.7, fontSize: '0.9rem' }}>
              You coordinate between Reader and Cipher Holder
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#0f3460',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #4facfe'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#4facfe' }}>Your Instructions:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>The <strong>Reader</strong> will describe the emojis they see</li>
            <li>Ask the <strong>Cipher Holder</strong> what letters those emojis represent</li>
            <li>Piece together the message and submit your guess below</li>
            <li>You win when you guess the correct message!</li>
          </ul>
        </div>
      </div>

      {gameState.gameWon ? (
        <div style={{
          backgroundColor: '#16213e',
          padding: '3rem',
          borderRadius: '12px',
          textAlign: 'center',
          border: '3px solid #4facfe'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 1rem 0', color: '#4facfe' }}>Victory!</h2>
          <p style={{ fontSize: '1.5rem', margin: '0 0 1.5rem 0' }}>
            You decoded the message:
          </p>
          <div style={{
            backgroundColor: '#0f3460',
            padding: '1.5rem',
            borderRadius: '8px',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#4facfe'
          }}>
            {gameState.currentMessage}
          </div>
        </div>
      ) : (
        <>
          <div style={{
            backgroundColor: '#16213e',
            padding: '2rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem' }}>Submit Your Guess:</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter the decoded message..."
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: '#0f3460',
                  color: '#eee',
                  border: '2px solid #4facfe',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontFamily: 'inherit'
                }}
              />
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#4facfe',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Submit Guess
              </button>
            </form>
          </div>

          {attempts.length > 0 && (
            <div style={{
              backgroundColor: '#16213e',
              padding: '2rem',
              borderRadius: '12px'
            }}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem' }}>Previous Attempts:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {attempts.map((attempt, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#0f3460',
                      padding: '1rem',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: `2px solid ${attempt.isCorrect ? '#4facfe' : '#e94560'}`
                    }}
                  >
                    <span style={{ fontWeight: 'bold' }}>{attempt.guess}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ opacity: 0.7, fontSize: '0.9rem' }}>{attempt.timestamp}</span>
                      <span style={{ fontSize: '1.5rem' }}>
                        {attempt.isCorrect ? '✅' : '❌'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CoordinatorView
