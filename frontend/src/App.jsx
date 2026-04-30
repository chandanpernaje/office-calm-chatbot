import { useState, useEffect, useRef } from 'react'
import { MessageSquarePlus, Trash2, Send, Menu, X, Bot, User } from 'lucide-react'
import './index.css'

function App() {
  const [sessions, setSessions] = useState([])
  const [currentSessionId, setCurrentSessionId] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const chatEndRef = useRef(null)
  const textareaRef = useRef(null)

  // Fetch sessions on mount
  useEffect(() => {
    loadSessions()
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [inputText])

  const loadSessions = async () => {
    try {
      const res = await fetch('/api/sessions')
      const data = await res.json()
      setSessions(data.sessions || [])
    } catch (e) {
      console.error('Failed to load sessions', e)
    }
  }

  const loadSessionHistory = async (sessionId) => {
    setCurrentSessionId(sessionId)
    setMessages([])
    setIsSidebarOpen(false)
    try {
      const res = await fetch(`/api/sessions/${sessionId}/history`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch (e) {
      console.error('Failed to load history', e)
    }
  }

  const deleteSession = async (sessionId, e) => {
    e.stopPropagation()
    if (!window.confirm("Delete this chat?")) return
    try {
      await fetch(`/api/sessions/${sessionId}`, { method: 'DELETE' })
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null)
        setMessages([])
      }
      loadSessions()
    } catch (err) {
      console.error('Failed to delete', err)
    }
  }

  const handleNewChat = () => {
    setCurrentSessionId(null)
    setMessages([])
    setIsSidebarOpen(false)
  }

  const handleSend = async (e) => {
    e?.preventDefault()
    const text = inputText.trim()
    if (!text || isLoading) return
    
    if (text.length > 2000) {
      alert('Message too long! Max 2000 characters.')
      return
    }

    const userMsg = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          session_id: currentSessionId || ''
        })
      })
      const data = await res.json()
      
      if (!res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Error: ${data?.error || 'Request failed'}` }])
      } else {
        if (data.session_id && data.session_id !== currentSessionId) {
          setCurrentSessionId(data.session_id)
          loadSessions()
        }
        let assistantContent = data.reply
        if (data.warning) {
          assistantContent += `\n\n⚠️ ${data.warning}`
        }
        setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ Connection error: ${err.message}` }])
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        textareaRef.current?.focus()
      }, 10)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const useChip = (text) => {
    setInputText(text)
    textareaRef.current?.focus()
  }

  const currentSession = sessions.find(s => s.session_id === currentSessionId)
  const headerTitle = currentSession?.title || 'Office Calm Chatbot'

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={handleNewChat}>
            <MessageSquarePlus size={18} />
            New Chat
          </button>
        </div>
        
        <div className="session-list">
          {sessions.length === 0 ? (
            <div style={{ color: 'var(--muted)', textAlign: 'center', marginTop: 20, fontSize: 13 }}>
              No chat history yet
            </div>
          ) : (
            sessions.map(s => (
              <div 
                key={s.session_id}
                className={`session-item ${currentSessionId === s.session_id ? 'active' : ''}`}
                onClick={() => loadSessionHistory(s.session_id)}
              >
                <span className="session-title">{s.title || 'New Chat'}</span>
                <button className="delete-btn" onClick={(e) => deleteSession(s.session_id, e)}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-area">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1>{headerTitle}</h1>
        </header>

        {messages.length === 0 && !isLoading ? (
          <div className="welcome-screen">
            <div className="welcome-icon">🧘‍♂️</div>
            <h2>How can I help you today?</h2>
            <div className="chips-grid">
              <button className="chip-btn" onClick={() => useChip("My boss shouted at me today")}>
                My boss shouted at me today
              </button>
              <button className="chip-btn" onClick={() => useChip("I'm overwhelmed with deadlines")}>
                I'm overwhelmed with deadlines
              </button>
              <button className="chip-btn" onClick={() => useChip("Conflict with a teammate")}>
                Conflict with a teammate
              </button>
              <button className="chip-btn" onClick={() => useChip("I feel burned out")}>
                I feel burned out
              </button>
            </div>
          </div>
        ) : (
          <div className="chat-history">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-row ${msg.role}`}>
                <div className="message-inner">
                  <div className={`avatar ${msg.role}`}>
                    {msg.role === 'user' ? 'U' : <Bot size={18} />}
                  </div>
                  <div className="message-content">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message-row assistant thinking">
                <div className="message-inner">
                  <div className="avatar assistant"><Bot size={18} /></div>
                  <div className="message-content">
                    Thinking...
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        )}

        <div className="composer-wrapper">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your office stress..."
              maxLength={2000}
            />
            <button 
              className="send-btn" 
              onClick={handleSend}
              disabled={!inputText.trim() || isLoading}
            >
              <Send size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
