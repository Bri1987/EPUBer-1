## EPUBer

将 PDF 文档批量转化为 EPUB 格式电子书的工具。

[Live Demo](https://epub-er.vercel.app/)

### 项目结构

```
.
├── app # Spring 后端
├── cli # 命令行工具
├── lib # PDF 转 EPUB 的库
└── web # 一个演示用的前端应用
```

其中 `lib` 是 `app` 和 `cli` 所共用的模块，包含了将 PDF 转为 EPUB 功能的库。`web` 是一个暂时用 Next.js 写的用来测试演示的 web 应用。

所有项目都用 gradle 进行管理，如果需要添加其他依赖的话，只需要修改相应模块下的 `build.gradle.kts` 文件即可。例如给 `cli` 模块添加依赖的话，只需要打开 `cli/build.gradle.kts` 文件，在 `dependencies {}` 块里面添加即可。

### 使用 lib 库

虽然 `lib` 和 `app` 这两个模块都是用 `Kotlin` 写的，但要在 Java 里面调用的话也是非常简单的，核心的方法只有 `Epuber.convert(pdfPath, epubPath)` 这一个，例如

```java
class Main {
    public static void main(String[] args) {
        Epuber.convert("/tmp/test.pdf", "/tmp/test.epub");
    }
}
```

`/tmp/test.pdf` 是 pdf 存放的路径，`/tmp/test.epub` 是转换完成后的 epub 保存的位置。

### 使用后端 API

目前后端大致写完了，还有一些细节（比如错误处理，日志记录还有安全问题什么的），现在已经部署了一个版本，可以通过 `https://epuber.tunkshif.one` 域名访问。使用的流程设计得稍微有些复杂。。。用到了 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API)。

#### 获取 `sessionId`

首先需要通过 WebSocket 连接 `wss://epuber.tunkshif.one/ws/session`，连接成功后会返回如下格式的消息

```json
{
  "type": "sessionId",
  "value": <UUID>
}
```

获取到的这个 `sessionId` 需要保存下来，后续上传文件需要用到

#### 上传文件

使用 `POST` 方法向 `https://epuber.tunkshif.one/api/upload` 以表单的形式发送以下格式的数据

```json
{
  "sessionID": <UUID>,
  "files": [<File>, <File>, ...]
}
```

请求成功后返回来的数据格式如下

```json
{
  "data": {
    "fileId 0": "file name 0",
    "fileId 1": "file name 1",
    ...
  }
}
```

这时候返回来的数据只是一系列文件 id 与对应文件名的键值对，此时服务端还是对 PDF 进行转换处理，等到处理完毕后，服务端会通过 WebSocket 发送下列格式的消息返回过来

```json
{
  "type": "fileId",
  "value": <UUID>
}
```

等收到 WebSocket 消息时才表示该文件已经转换完毕，可以通过直接访问 `https://epuber.tunkshif.one/api/download/<fileId>` 来下载

### CLI 功能需求

目前对 CLI 的功能预期像下面这个样子，例如 `cli` 模块打包成一个叫 `cli.jar` 的 jar 包后，可以按下面的方式使用：

```shell
# 将当前目录下的 A.pdf 转换为 A.epub 并同样保存在当前目录下
java -jar cli.jar A.pdf
# 可以同时接收多个 pdf 文件实现批量转换
java -jar cli.jar A.pdf B.pdf folder/C.pdf
# 可以指定输出的 epub 所保存的目录，比如这里用 --ouput 参数指定保存在当前目录下的 output 文件夹里
java -jar cli.jar A.pdf B.pdf --output ./ouput
```

上面的基本的功能实现以后可以考虑的拓展任务：

1. 实现多个文件的并发转换
2. 实现日志记录的功能

