@file:JvmName("Epuber")

package one.tunkshif.epuber

import nl.siegmann.epublib.domain.Book
import nl.siegmann.epublib.domain.Resource
import org.jsoup.Jsoup
import java.io.File

private const val start = """
<?xml version='1.0' encoding='utf-8'?>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
    <head>
        <title></title>
        <link rel="stylesheet" href="base.css"/>
        <link rel="stylesheet" href="page.css"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    </head>
    <body>
"""

private const val end = """
    </body>
</html>
"""

private const val baseCss = """
.pf {
  position: relative;
  background-color: white;
  overflow: hidden;
  margin: 0;
  border: 0;
}
.pc {
  position: absolute;
  border: 0;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
}
.pc.opened {
  display: block;
}
.bf {
  position: absolute;
  border: 0;
  margin: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.bi {
  position: absolute;
  border: 0;
  margin: 0;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
@media print {
  .pf {
    margin: 0;
    box-shadow: none;
    page-break-after: always;
    page-break-inside: avoid;
  }
  @-moz-document url-prefix() {
    .pf {
      overflow: visible;
      border: 1px solid #fff;
    }
    .pc {
      overflow: visible;
    }
  }
}
.c {
  position: absolute;
  border: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
  display: block;
}
.t {
  position: absolute;
  white-space: pre;
  font-size: 1px;
  transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -webkit-transform-origin: 0 100%;
  unicode-bidi: bidi-override;
  -moz-font-feature-settings: "liga" 0;
}
.t:after {
  content: "";
}
.t:before {
  content: "";
  display: inline-block;
}
.t span {
  position: relative;
  unicode-bidi: bidi-override;
}
._ {
  display: inline-block;
  color: transparent;
  z-index: -1;
}
::selection {
  background: rgba(127, 255, 255, 0.4);
}
::-moz-selection {
  background: rgba(127, 255, 255, 0.4);
}
.pi {
  display: none;
}
.d {
  position: absolute;
  transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -webkit-transform-origin: 0 100%;
}
.it {
  border: 0;
  background-color: rgba(255, 255, 255, 0);
}
.ir:hover {
  cursor: pointer;
}
"""

fun convert(pdfPath: String, epubPath: String): Boolean {
    val file = File(pdfPath)
    val name = file.name.replace("\\.pdf".toRegex(), "")
    val process = ProcessBuilder().command(
        "pdf2htmlEX",
        "--zoom",
        "1.3",
        file.absolutePath,
        "--embed-css",
        "0",
        "--embed-javascript",
        "0"
    ).directory(File("/tmp/epuber")).start()
    val status = process.waitFor()
    if (status != 0) return false

    val doc = Jsoup.parse(File("${file.parent}/$name.html"), "UTF-8")
    val content = buildString {
        append(start)
        append(doc.select("#page-container").html())
        append(end)
    }
    val book = Book().apply {
        resources.add(Resource(baseCss.toByteArray(), "base.css"))
        resources.add(Resource(File("${file.parent}/$name.css").readBytes(), "page.css"))
        addSection("CONTENT", Resource(content.toByteArray(), "index.html"))
    }
    book.save(epubPath)
    return true
}