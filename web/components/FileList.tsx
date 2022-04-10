import {
  DocumentTextIcon,
  CloudIcon,
  DownloadIcon,
  TrashIcon,
  StopIcon
} from "@heroicons/react/outline"
import _ from "lodash"
import { ChangeEventHandler, RefObject } from "react"
import { PDFFile } from "../types"
import UploadFormInFormList from "./UploadFormInFormList"

type FileProps = {
  id: string
  name: string
  status: "none" | "upload" | "download" | "selecting"
  isSelect: boolean
  onDelete:(name:String) => void
}

type FileListProps = {
  files: PDFFile[]
  upload: boolean
  fileInput:RefObject<HTMLInputElement>
  select: boolean
  onDelete:(name:String) => void
  onChange: ChangeEventHandler<HTMLInputElement>
}

type Status = {
  id:string
  name:string
  status:"none" | "upload" | "download" | "selecting"
  isSelect: boolean
  onDelete:(name:string) => void
}

const Status = ({ id, status, name, isSelect, onDelete }: Status) => {
  switch (status) {
    case "none":
      return (
        <button
          onClick={() => onDelete(name)}
          className="flex items-center"
        >
          <span className="mr-2 flex  items-center justify-center">
                <TrashIcon className="h-6 w-6 text-gray-600" />
          </span>
        </button>        
      )
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
      case "selecting":
        return(
          <button
            onClick={() => onDelete(name)}
            className="flex items-center"
          >
            <span className="mr-2 flex  items-center justify-center">
              <StopIcon className={`h-6 w-6 ${isSelect ? 'text-white' : 'text-gray-600'}`} />
            </span>
          </button> 
        )
  }
}

const File = ({ id, name, status, isSelect, onDelete  }: FileProps) => {
  return (
    <div className= {`flex w-full items-center justify-between rounded-md px-4 py-4 ${isSelect ? 'bg-gray-500' + ' bg-opacity-70': 'bg-gray-100'}`}>
      <div className="flex items-center">
        <span className="mr-2 flex items-center justify-center">
          <DocumentTextIcon className={`h-6 w-6 ${isSelect ? 'text-white' : 'text-gray-600'}`}/>
        </span>
        <span className={`${isSelect ? 'text-white' : 'text-gray-800'}`}>{name}</span>
      </div>
      <Status id={id} status={status} name={name} isSelect={isSelect} onDelete={onDelete}/>
    </div>
  )
}

const FileList = ({ files, onDelete, onChange, upload, fileInput, select }: FileListProps) => {
  return (
    <div className="flex h-full w-full flex-col space-y-2">
      {files.map((file, index) => {
        return(
          <div className="flex h-full w-full flex-col items-center space-y-2" key={index}>
          <File
            id={file.id || ""}
            name={file.name}
            status={file.status}
            isSelect={file.isSelect}
            onDelete={onDelete}
          />
        </div>
        )
      })}
      {upload || select ? (
        <div></div>
      ) : (
        <UploadFormInFormList onChange={onChange} fileInput={fileInput}/>
      )
      }

    </div>
  )
}

export default FileList
