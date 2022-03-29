package one.tunkshif.epuber.service

import one.tunkshif.epuber.convert

class ConvertTask(
    val sessionId: String,
    private val fileId: String,
    private val onDoneCallback: () -> Unit
) : Runnable {
    override fun run() {
        // TODO: Error Handling
        convert("/tmp/epuber/$fileId.pdf", "/tmp/epuber/$fileId.epub")
        onDoneCallback()
    }
}