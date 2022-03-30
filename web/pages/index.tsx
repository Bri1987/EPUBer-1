import type { NextPage } from "next"
import { ChangeEvent, useState } from "react"
import { Layout, UploadButton, UploadForm, FileList } from "../components"
import { PDFFile } from "../types"
import useSession from "../hooks/useSession"
import _ from "lodash"

const Home: NextPage = () => {
  const [files, setFiles] = useState<PDFFile[]>([])

  const sessionId = useSession((fileId) => {
    setFiles((files) =>
      files.map((file) => ({
        ...file,
        status: file.id == fileId ? "download" : file.status
      }))
    )
  })

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFiles(
        Array.from(files).map((file) => ({
          id: null,
          name: file.name,
          file: file,
          status: "none"
        }))
      )
    }
  }

  const onSubmit = () => {
    if (files.length != 0) {
      const formData = new FormData()
      formData.append("sessionId", sessionId)
      files.forEach((file) => formData.append("files", file.file))

      setFiles((files) => files.map((file) => ({ ...file, status: "upload" })))

      fetch("http://epuber.tunkshif.one:8080/api/upload", {
        method: "POST",
        body: formData
      })
        .then((res) => res.json())
        .then((data: Record<string, string>) => {
          const ids = _.toPairs(data.data).map(([id, name]) => ({ id, name }))
          console.log(ids)
          setFiles((files) =>
            files.map((file) => ({
              ...file,
              id: _.find(ids, ["name", file.name])?.id || ""
            }))
          )
        })
    }
  }

  return (
    <Layout>
      <div>
        <div className="flex min-h-[360px] rounded-lg bg-white p-4 shadow-sm">
          {files.length == 0 ? (
            <UploadForm onChange={onFormChange} />
          ) : (
            <FileList files={files} />
          )}
        </div>
        <div className="my-4 flex items-center justify-end">
          <UploadButton onClick={onSubmit} />
        </div>
      </div>
    </Layout>
  )
}

export default Home
