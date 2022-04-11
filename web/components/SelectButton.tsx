import { SelectorIcon, TrashIcon } from "@heroicons/react/outline"

type SelectButtonProps = {
    onSelect:() => void
    select:boolean
}

const SelectButton = ({ onSelect, select }:SelectButtonProps) => {
    return(
        <div>
            {select == false ? (
                <button
                    onClick={onSelect}
                    className="flex items-center justify-between rounded-md bg-white px-4 py-2 shadow transition-all hover:bg-gray-50 hover:bg-opacity-90 mr-2"
                >
                    <span className="flex items-center justify-center">
                        <SelectorIcon className="mr-2 h-6 w-6 text-gray-800" />
                    </span>
                    <span className="font-bold text-gray-600">Select</span>
                </button>
            ) : (
                <button
                    onClick={onSelect}
                    className="flex items-center justify-between rounded-md bg-gray-500 px-4 py-2 shadow transition-all hover:bg-opacity-70 mr-2"
                >
                    <span className="flex items-center justify-center">
                        <TrashIcon className="mr-2 h-6 w-6 text-white" />
                    </span>
                    <span className="font-bold text-white">Delete</span>
                </button>
            )
            }
        </div>
    )
}

export default SelectButton