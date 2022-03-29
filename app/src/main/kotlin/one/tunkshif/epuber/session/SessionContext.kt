package one.tunkshif.epuber.session

import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import java.util.concurrent.Future

class SessionContext(
    private val session: WebSocketSession
) {
    private val tasks = mutableListOf<Future<*>>()

    fun notify(fileId: String) = session.sendMessage(TextMessage(fileId))

    fun addTask(future: Future<*>) = tasks.add(future)

    fun cancelTasks() = tasks.forEach {
        if (!it.isDone && !it.isCancelled) {
            it.cancel(true)
        }
    }
}