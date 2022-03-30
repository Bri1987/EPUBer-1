export type WebSocketMessage = {
  type: "sessionId" | "fileId"
  value: string
}

export type PDFFile = {
  id: string | null
  name: string
  file: File
  status: "none" | "upload" | "download"
}
