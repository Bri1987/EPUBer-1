import { CloudUploadIcon } from "@heroicons/react/outline"
import { ChangeEventHandler } from "react"

type UploadFormProps = {
  onChange: ChangeEventHandler<HTMLInputElement>
}

const UploadForm = ({ onChange }: UploadFormProps) => {
  return (
    <div className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-4">
      <div>
        <label
          htmlFor="file-input"
          className="flex cursor-pointer flex-col items-center justify-center space-y-2"
        >
          <div>
            <CloudUploadIcon className="h-9 w-9 text-gray-400" />
          </div>
          <div className="text-gray-600">
            Click to upload PDFs here, max allowed size is <em>20MB</em>
          </div>
        </label>
        <input
          id="file-input"
          accept=".pdf"
          type="file"
          className="hidden"
          multiple
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default UploadForm
