import { CheckIcon, DocumentTextIcon } from "@heroicons/react/outline";
import ReactDOM from "react-dom";
import { windowContent } from "../types";

const styles = {
    mask: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        height: '100%',
        zIndex: 1000,
    }
}

const ConfirmWindowShow = (isDelete:boolean, content:windowContent, confirm:() => void, cancel:() => void) => {
    console.log("enter")
    console.log(isDelete)
    if(isDelete){
        const JSXdom = (
            <div style={styles.mask} className="fixed flex items-center justify-center">
                <div className="flex rounded-lg bg-white p-6 shadow-sm border-double border-4 border-gray-600">
                    <div>
                        <p className="pb-1 text-2xl font-bold text-gray-800">
                            {content.title}
                        </p>
                        <h3 className="font-mono text-lg text-gray-700 mb-5">
                            {content.operation}
                        </h3>
                        <div>
                            {
                                content.fileslist.map((fileName,index) => {
                                    return(
                                    <div key={index} className="flex items-center pb-3 pl-3">
                                        <span className="mr-2 flex items-center justify-center">
                                            <DocumentTextIcon className="h-6 w-6 text-gray-600"/>
                                        </span>
                                        <span className="text-gray-800">{fileName}</span>
                                    </div>)
                                })
                            }
                        </div>
                        <div className="mt-5 flex items-center justify-around">
                            {!content.confirmButton ? (
                                <></>
                            ) : (
                                <button onClick={confirm} className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-2 p shadow-sm transition-all hover:bg-gray-200 hover:bg-opacity-90 border-2 border-dotted">{content.confirmButton}</button>
                            )
                            }
                            <button onClick={cancel} className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-2 p shadow-sm transition-all hover:bg-gray-200 hover:bg-opacity-90 border-2 border-dotted">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )

        const div1 = document.createElement("div")
        div1.setAttribute("id","mask")
        document.body.appendChild(div1)
        setTimeout(() => {
            ReactDOM.render(JSXdom, div1)
        })
    }
}

export { ConfirmWindowShow }