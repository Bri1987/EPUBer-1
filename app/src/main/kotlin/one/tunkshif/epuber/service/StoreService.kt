package one.tunkshif.epuber.service

import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.util.UUID
import kotlin.io.path.Path
import kotlin.io.path.exists

@Service
class StoreService {
    init {
        Path("/tmp/epuber").takeUnless { it.exists() }?.let { Files.createDirectory(it) }
    }

    fun store(uploadFile: MultipartFile): String {
        val uuid = UUID.randomUUID()
        val file = File("/tmp/epuber/$uuid.pdf")
        uploadFile.transferTo(file)
        return uuid.toString()
    }

    fun serve(fileId: String): Resource {
        //TODO: Error handling
        val file = File("/tmp/epuber/$fileId.epub")
        return FileSystemResource(file)
    }
}