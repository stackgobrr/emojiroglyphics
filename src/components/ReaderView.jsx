function ReaderView({ gameState }) {
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
