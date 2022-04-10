export type WebSocketMessage = {
  type: "sessionId" | "fileId"
  value: string
}

export type PDFFile = {
  id: string | null
  name: string
  file: File
  status: "none" | "upload" | "download" | "selecting"
  isSelect:boolean
}

export type windowContent = {
  title: string
  operation: string
  fileslist: string[]
  confirmButton: string | null
}
