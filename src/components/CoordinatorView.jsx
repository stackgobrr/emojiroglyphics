import { useState, useEffect, useRef } from 'react'

function CoordinatorView({ gameState, setGameState }) {
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState([])
  const [activeCall, setActiveCall] = useState(null) // 'reader' or 'cipher'
  const [isConnecting, setIsConnecting] = useState(false)
  const localStreamRef = useRef(null)
  const peerConnectionRef = useRef(null)

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

  const startCall = async (targetRole) => {
    if (activeCall) return // Already in a call

    setIsConnecting(true)
    setActiveCall(targetRole)

    try {
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      localStreamRef.current = stream

      // Signal that coordinator wants to call this role
      setGameState(prev => ({
        ...prev,
        voiceCall: {
          caller: 'coordinator',
          target: targetRole,
          status: 'ringing',
          timestamp: Date.now()
        }
      }))

      setIsConnecting(false)
    } catch (error) {
      console.error('Failed to get microphone access:', error)
      alert('Failed to access microphone. Please check permissions.')
      endCall()
    }
  }

  const endCall = () => {
    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop())
      localStreamRef.current = null
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }

    // Clear call state
    setActiveCall(null)
    setIsConnecting(false)

    // Clear voice call from game state
    setGameState(prev => ({
      ...prev,
      voiceCall: null
    }))
  }

  // Listen for call state changes
  useEffect(() => {
    if (!gameState.voiceCall) {
      // Call ended by other player
      if (activeCall) {
        endCall()
      }
    }
  }, [gameState.voiceCall])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close()
      }
    }
  }, [])

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

      <div style={{
        backgroundColor: '#16213e',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem' }}>Voice Chat:</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => startCall('reader')}
            disabled={activeCall !== null || isConnecting}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '1rem',
              backgroundColor: activeCall === 'reader' ? '#667eea' : (activeCall ? '#444' : '#667eea'),
              color: 'white',
              border: activeCall === 'reader' ? '2px solid #8899ff' : 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: (activeCall && activeCall !== 'reader') ? 'not-allowed' : 'pointer',
              opacity: (activeCall && activeCall !== 'reader') ? 0.5 : 1,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>📖</span>
            {activeCall === 'reader' ? (isConnecting ? 'Connecting...' : '🔊 Speaking with Reader') : 'Call Reader'}
          </button>

          <button
            onClick={() => startCall('cipher')}
            disabled={activeCall !== null || isConnecting}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '1rem',
              backgroundColor: activeCall === 'cipher' ? '#f093fb' : (activeCall ? '#444' : '#f093fb'),
              color: 'white',
              border: activeCall === 'cipher' ? '2px solid #ff9fff' : 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: (activeCall && activeCall !== 'cipher') ? 'not-allowed' : 'pointer',
              opacity: (activeCall && activeCall !== 'cipher') ? 0.5 : 1,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>🔑</span>
            {activeCall === 'cipher' ? (isConnecting ? 'Connecting...' : '🔊 Speaking with Cipher Holder') : 'Call Cipher Holder'}
          </button>
        </div>

        {activeCall && (
          <button
            onClick={endCall}
            style={{
              width: '100%',
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#e94560',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            📞 End Call
          </button>
        )}

        <p style={{
          marginTop: '1rem',
          marginBottom: 0,
          fontSize: '0.85rem',
          opacity: 0.7,
          textAlign: 'center'
        }}>
          {activeCall ? '💡 You can only talk to one player at a time' : '💡 Click to start a voice call with a player'}
        </p>
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
