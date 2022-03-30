import { useEffect, useState } from "react"
import { WebSocketMessage } from "../types"

const useSession = (onMessage: (message: string) => void) => {
  const [sessionId, setSessionId] = useState("")

  useEffect(() => {
    const socket = new WebSocket("wss://epuber.tunkshif.one/ws/session")
    socket.addEventListener("message", (e) => {
      const message = JSON.parse(e.data) as WebSocketMessage
      switch (message.type) {
        case "sessionId":
          setSessionId(message.value)
          break
        case "fileId":
          onMessage(message.value)
          break
      }
    })

    return () => {
      socket.close()
    }
  }, [])

  return sessionId
}

export default useSession
