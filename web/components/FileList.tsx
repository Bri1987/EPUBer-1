import {
  DocumentTextIcon,
  CloudIcon,
  DownloadIcon
} from "@heroicons/react/outline"
import _ from "lodash"
import { PDFFile } from "../types"

type FileProps = {
  id: string
  name: string
  status: "none" | "upload" | "download"
}

type FileListProps = {
  files: PDFFile[]
}

const Status = ({
  id,
  status
}: {
  id: string
  status: "none" | "upload" | "download"
}) => {
  switch (status) {
    case "none":
      return <div></div>
    case "upload":
      return (
        <div className="flex animate-bounce items-center">
          <span className="mr-2 flex  items-center justify-center">
            <CloudIcon className="h-6 w-6 text-gray-600" />
          </span>
          <span className="font-bold text-gray-600">Processing</span>
        </div>
      )
    case "download":
      return (
        <div className="flex items-center">
          <span className="mr-2 flex  items-center justify-center">
            <DownloadIcon className="h-6 w-6 text-gray-600" />
          </span>
          <span className="font-bold text-gray-600">
            <a href={`https://epuber.tunkshif.one/api/download/${id}`}>
              Download
            </a>
          </span>
        </div>
      )
  }
}

const File = ({ id, name, status }: FileProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-md px-4 py-4 odd:bg-gray-50">
      <div className="flex items-center">
        <span className="mr-2 flex items-center justify-center">
          <DocumentTextIcon className="h-6 w-6 text-gray-600" />
        </span>
        <span className="text-gray-800">{name}</span>
      </div>
      <Status id={id} status={status} />
    </div>
  )
}

const FileList = ({ files }: FileListProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center space-y-2">
      {files.map((file, index) => (
        <File
          id={file.id || ""}
          name={file.name}
          status={file.status}
          key={index}
        />
      ))}
    </div>
  )
}

export default FileList
