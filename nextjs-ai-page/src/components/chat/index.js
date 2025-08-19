import { useEffect, useRef } from "react"
import { useChat } from "ai/react"

export default function Chat({ api }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api
  });

  const messagesEndRef = useRef(null)

  const messageLength = messages.length;
  const lastMessage = messages[messageLength - 1];
  const isLastMessageFromAssistant =
    messageLength > 0 && lastMessage?.role !== 'user';

  /**
   * `isPending` indicate that stream response is not yet received from the server,
   * so we show a loading indicator to give a better UX.
   */
  const isPending = isLoading && !isLastMessageFromAssistant;

  /** 
   * Scroll to bottom of the chat when new message is added
  */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="empty-state">
            <p>Start a conversation!</p>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.role === "user" ? "user-message" : "assistant-message"}`}>
            <div className="message-role">{message.role === "user" ? "You" : "Bot"}</div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isPending && (
          <div className="message assistant-message">
            <div className="message-role">Bot</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="message-input"
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
