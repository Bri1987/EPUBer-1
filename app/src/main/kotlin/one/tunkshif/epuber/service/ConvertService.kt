package one.tunkshif.epuber.service

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.concurrent.ExecutorService

@Service
class ConvertService(
    @Autowired
    private val executor: ExecutorService,
    @Autowired
    private val sessionService: SessionService
) {
    fun submit(task: ConvertTask) {
        // TODO: Error Handling
        val future = executor.submit(task)
        sessionService.find(task.sessionId)?.addTask(future)
    }
}