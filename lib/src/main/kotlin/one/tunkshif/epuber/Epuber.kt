@file:JvmName("Epuber")

package one.tunkshif.epuber

import nl.siegmann.epublib.domain.Author
import nl.siegmann.epublib.domain.Book
import nl.siegmann.epublib.domain.Resource
import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.rendering.PDFRenderer
import java.io.File

private const val start = """
<?xml version='1.0' encoding='utf-8'?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
    <head>
        <title>CONTENT</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    </head>
    <body>
"""

private const val end = """
    </body>
</html>
"""

private fun fromPdf(pdf: File): Book {
    val document = PDDocument.load(pdf)
    val renderer = PDFRenderer(document)

    val title = document.documentInformation.title
    val author = document.documentInformation.author

    val book = Book().apply {
        metadata.addTitle(title)
        metadata.addAuthor(Author(author))
    }

    val pageCount = document.numberOfPages
    (0 until pageCount).forEach {
        val image = renderer.renderImage(it)
        book.resources.add(Resource(image.toByteArray(), "images/$it.png"))
    }

    val content = buildString {
        append(start)
        (0 until pageCount).forEach {
            append("""<p><img src="images/$it.png" /></p>""")
        }
        append(end)
    }

    book.addSection("CONTENTS", Resource(content.toByteArray(), "index.html"))

    return book
}

fun convert(pdfPath: String, epubPath: String) {
    fromPdf(File(pdfPath)).save(epubPath)
}