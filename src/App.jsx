import { useState, useEffect } from 'react'
import GameLobby from './components/GameLobby'
import RoleSelection from './components/RoleSelection'
import ReaderView from './components/ReaderView'
import CipherView from './components/CipherView'
import CoordinatorView from './components/CoordinatorView'

function App() {
  const [gameKey, setGameKey] = useState(null)
  const [role, setRole] = useState(null)
  const [gameState, setGameState] = useState({
    currentMessage: null,
    cipher: null,
    isGameActive: false,
    players: {}
  })

  // Sync game state to localStorage for sharing between players
  useEffect(() => {
    if (gameKey) {
      const savedState = localStorage.getItem(`game_${gameKey}`)
      if (savedState) {
        setGameState(JSON.parse(savedState))
      }
    }
  }, [gameKey])

  useEffect(() => {
    if (gameKey && gameState.isGameActive) {
      localStorage.setItem(`game_${gameKey}`, JSON.stringify(gameState))
    }
  }, [gameState, gameKey])

  const resetGame = () => {
    setGameKey(null)
    setRole(null)
    setGameState({
      currentMessage: null,
      cipher: null,
      isGameActive: false,
      players: {}
    })
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      color: '#eee',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '1rem'
    }}>
      {!gameKey ? (
        <GameLobby onGameReady={setGameKey} />
      ) : !role ? (
        <RoleSelection
          gameKey={gameKey}
          onSelectRole={setRole}
          gameState={gameState}
          setGameState={setGameState}
        />
      ) : (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '1rem',
            borderBottom: '2px solid #16213e',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '2rem' }}>Emojiroglyphics</h1>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.7 }}>
                Game Key: <code style={{
                  backgroundColor: '#16213e',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>{gameKey}</code>
              </p>
            </div>
            <button
              onClick={resetGame}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#e94560',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Leave Game
            </button>
          </div>

          {role === 'reader' && <ReaderView gameState={gameState} setGameState={setGameState} gameKey={gameKey} />}
          {role === 'cipher' && <CipherView gameState={gameState} setGameState={setGameState} gameKey={gameKey} />}
          {role === 'coordinator' && <CoordinatorView gameState={gameState} setGameState={setGameState} gameKey={gameKey} />}
        </>
      )}
    </div>
  )
}

export default App
