import { CheckCircleIcon } from "@heroicons/react/outline"

type UploadButtonProps = {
  onClick: () => void
}

const UploadButton = ({ onClick }: UploadButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between rounded-md bg-white px-4 py-2 shadow-sm transition-all hover:bg-gray-50 hover:bg-opacity-90"
    >
      <span className="flex items-center justify-center">
        <CheckCircleIcon className="mr-2 h-6 w-6 text-gray-800" />
      </span>
      <span className="font-bold text-gray-600">Upload</span>
    </button>
  )
}

export default UploadButton
