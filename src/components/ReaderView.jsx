import { useState, useEffect, useRef } from 'react'

function ReaderView({ gameState, setGameState }) {
  const [incomingCall, setIncomingCall] = useState(false)
  const [inCall, setInCall] = useState(false)
  const localStreamRef = useRef(null)
  const peerConnectionRef = useRef(null)

  // Listen for incoming calls
  useEffect(() => {
    if (gameState.voiceCall && gameState.voiceCall.target === 'reader') {
      if (gameState.voiceCall.status === 'ringing') {
        setIncomingCall(true)
      }
    } else {
      setIncomingCall(false)
      if (inCall) {
        endCall()
      }
    }
  }, [gameState.voiceCall])

  const answerCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      localStreamRef.current = stream
      setInCall(true)
      setIncomingCall(false)

      // Update call status to connected
      setGameState(prev => ({
        ...prev,
        voiceCall: {
          ...prev.voiceCall,
          status: 'connected'
        }
      }))
    } catch (error) {
      console.error('Failed to get microphone access:', error)
      alert('Failed to access microphone. Please check permissions.')
    }
  }

  const declineCall = () => {
    setIncomingCall(false)
    setGameState(prev => ({
      ...prev,
      voiceCall: null
    }))
  }

  const endCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop())
      localStreamRef.current = null
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close()
      peerConnectionRef.current = null
    }
    setInCall(false)
    setIncomingCall(false)
  }

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
          <span style={{ fontSize: '2rem', marginRight: '1rem' }}>📖</span>
          <div>
            <h2 style={{ margin: 0, color: '#667eea' }}>Reader</h2>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.7, fontSize: '0.9rem' }}>
              You see the encrypted message
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#0f3460',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #667eea'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#667eea' }}>Your Instructions:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>Look at the emoji message below</li>
            <li>Describe the emojis you see to the <strong>Coordinator</strong></li>
            <li>You cannot see the cipher key - only describe what you see</li>
            <li>Work together to decode the message!</li>
          </ul>
        </div>
      </div>

      {incomingCall && (
        <div style={{
          backgroundColor: '#16213e',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '3px solid #4facfe',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4facfe' }}>Incoming Call</h3>
            <p style={{ margin: '0 0 1.5rem 0', opacity: 0.8 }}>
              Coordinator wants to talk to you
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={answerCall}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#4facfe',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ✅ Answer
              </button>
              <button
                onClick={declineCall}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#e94560',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ❌ Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {inCall && (
        <div style={{
          backgroundColor: '#16213e',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '2px solid #4facfe',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔊</span>
            <span style={{ fontWeight: 'bold', color: '#4facfe' }}>
              In call with Coordinator
            </span>
          </div>
          <button
            onClick={() => {
              endCall()
              setGameState(prev => ({ ...prev, voiceCall: null }))
            }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#e94560',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            📞 End Call
          </button>
        </div>
      )}

      {gameState.voiceCall && gameState.voiceCall.target === 'cipher' && gameState.voiceCall.status === 'connected' && (
        <div style={{
          backgroundColor: '#16213e',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          border: '2px solid #f093fb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          opacity: 0.8
        }}>
          <span style={{ fontSize: '1.2rem' }}>💬</span>
          <span style={{ fontSize: '0.9rem' }}>
            Coordinator is talking to <strong style={{ color: '#f093fb' }}>Cipher Holder</strong>
          </span>
        </div>
      )}

      <div style={{
        backgroundColor: '#16213e',
        padding: '2rem',
        borderRadius: '12px'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem' }}>Encrypted Message:</h3>
        <div style={{
          fontSize: '3rem',
          lineHeight: 1.8,
          backgroundColor: '#0f3460',
          padding: '2rem',
          borderRadius: '8px',
          minHeight: '150px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          wordBreak: 'break-word',
          letterSpacing: '0.5rem'
        }}>
          {gameState.encryptedMessage || (
            <p style={{ opacity: 0.5, fontSize: '1rem', letterSpacing: 'normal' }}>
              Waiting for game to start...
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReaderView
