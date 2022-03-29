package one.tunkshif.epuber.service

import one.tunkshif.epuber.session.SessionContext
import org.springframework.stereotype.Service
import org.springframework.web.socket.WebSocketSession
import java.util.concurrent.ConcurrentHashMap

@Service
class SessionService {
    private val sessions = ConcurrentHashMap<String, SessionContext>()

    fun new(session: WebSocketSession) {
        sessions[session.id] = SessionContext(session)
    }

    // TODO: Error Handling
    fun find(sessionId: String) = sessions[sessionId]

    // TODO: To be implemented
    fun notify(sessionId: String, fileId: String) = sessions[sessionId]?.notify(fileId)

    fun destroy(sessionId: String) {
        sessions[sessionId]?.cancelTasks()
        sessions.remove(sessionId)
    }
}