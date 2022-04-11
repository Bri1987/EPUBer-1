import { PlusIcon } from "@heroicons/react/outline"
import { ChangeEventHandler, RefObject } from "react"

type UploadFormProps = {
    onChange: ChangeEventHandler<HTMLInputElement>
    fileInput:RefObject<HTMLInputElement>
}

const UploadFormInFormList = ( { onChange, fileInput }:UploadFormProps) => {
    return(
        <div className="pt-2">
            <label
                htmlFor="file-input"
                className="flex cursor-pointer flex-col items-center justify-center space-y-2"
            >
            <div>
                <PlusIcon className="h-9 w-9 text-gray-400"/>
            </div>
            </label>            
            <input
                ref={fileInput}
                id="file-input"
                accept=".pdf"
                type="file"
                className="hidden"
                multiple
                onChange={onChange}
            />
        </div>
    )
}

export default UploadFormInFormList