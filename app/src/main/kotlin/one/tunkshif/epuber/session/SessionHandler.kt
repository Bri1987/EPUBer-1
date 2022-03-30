package one.tunkshif.epuber.session

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import one.tunkshif.epuber.data.Message
import one.tunkshif.epuber.service.SessionService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler

class SessionHandler : TextWebSocketHandler() {
    @Autowired
    private lateinit var sessionService: SessionService

    private val objectMapper = jacksonObjectMapper()

    override fun afterConnectionEstablished(session: WebSocketSession) {
        sessionService.new(session)
        session.sendMessage(
            TextMessage(
                objectMapper.writeValueAsString(
                    Message("sessionId", session.id)
                )
            )
        )
    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        sessionService.destroy(session.id)
    }
}