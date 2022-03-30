package one.tunkshif.epuber.session

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import one.tunkshif.epuber.data.Message
import org.slf4j.LoggerFactory
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketMessage
import org.springframework.web.socket.WebSocketSession
import java.util.concurrent.Future

class SessionContext(
    private val session: WebSocketSession
) {
    private val tasks = mutableListOf<Future<*>>()

    private val objectMapper = jacksonObjectMapper()

    fun notify(fileId: String) =
        session.sendMessage(TextMessage(objectMapper.writeValueAsString(Message("fileId", fileId))))

    fun addTask(future: Future<*>) = tasks.add(future)

    fun cancelTasks() = tasks.forEach {
        if (!it.isDone && !it.isCancelled) {
            it.cancel(true)
        }
    }
}