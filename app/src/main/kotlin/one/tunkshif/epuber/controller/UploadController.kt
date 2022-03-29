package one.tunkshif.epuber.controller

import one.tunkshif.epuber.service.ConvertService
import one.tunkshif.epuber.service.ConvertTask
import one.tunkshif.epuber.service.SessionService
import one.tunkshif.epuber.service.StoreService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.Resource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
class UploadController(
    @Autowired
    private val storeService: StoreService,
    @Autowired
    private val convertService: ConvertService,
    @Autowired
    private val sessionService: SessionService
) {
    @PostMapping("/upload")
    @CrossOrigin(origins = ["*"])
    fun upload(
        @RequestParam("sessionId") sessionId: String,
        @RequestParam("file") uploadFiles: List<MultipartFile>
    ): List<String> {
        val fileIds = uploadFiles.map {
            val fileId = storeService.store(it)
            convertService.submit(ConvertTask(sessionId, fileId) {
                sessionService.find(sessionId)?.notify(fileId)
            })
            fileId
        }
        // TODO
        return fileIds
    }

    @GetMapping("/download/{fileId}")
    fun download(@PathVariable fileId: String): ResponseEntity<Resource> {
        // TODO: Error handling
        val file = storeService.serve(fileId)
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, """attachment; filename="${file.filename}"""").body(file)
    }
}