package one.tunkshif.epuber

import nl.siegmann.epublib.domain.Book
import nl.siegmann.epublib.epub.EpubWriter
import java.awt.image.BufferedImage
import java.io.ByteArrayOutputStream
import java.io.FileOutputStream
import javax.imageio.ImageIO

fun BufferedImage.toByteArray(): ByteArray {
    val output = ByteArrayOutputStream()
    ImageIO.write(this, "png", output)
    return  output.toByteArray()
}

fun Book.save(filename: String) {
    val writer = EpubWriter()
    writer.write(this, FileOutputStream(filename))
}