function CipherView({ gameState }) {
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
          <span style={{ fontSize: '2rem', marginRight: '1rem' }}>🔑</span>
          <div>
            <h2 style={{ margin: 0, color: '#f093fb' }}>Cipher Holder</h2>
            <p style={{ margin: '0.25rem 0 0 0', opacity: 0.7, fontSize: '0.9rem' }}>
              You have the decryption key
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#0f3460',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #f093fb'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#f093fb' }}>Your Instructions:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.8 }}>
            <li>You have the cipher key below</li>
            <li>Tell the <strong>Coordinator</strong> which letter each emoji represents</li>
            <li>You cannot see the encrypted message - only the key</li>
            <li>Help decode the message together!</li>
          </ul>
        </div>
      </div>

      <div style={{
        backgroundColor: '#16213e',
        padding: '2rem',
        borderRadius: '12px'
      }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.5rem' }}>Cipher Key:</h3>
        {gameState.cipher ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '1rem',
            backgroundColor: '#0f3460',
            padding: '1.5rem',
            borderRadius: '8px'
          }}>
            {Object.entries(gameState.cipher).map(([letter, emoji]) => (
              <div
                key={letter}
                style={{
                  backgroundColor: '#1a1a2e',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '2px solid #f093fb'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{emoji}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#f093fb' }}>{letter}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            backgroundColor: '#0f3460',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            opacity: 0.5
          }}>
            Waiting for game to start...
          </div>
        )}
      </div>
    </div>
  )
}

export default CipherView
