import type { NextPage } from "next"
import { ChangeEvent, useRef, useState } from "react"
import { Layout, UploadButton, UploadForm, FileList } from "../components"
import { PDFFile, windowContent } from "../types"
import useSession from "../hooks/useSession"
import _ from "lodash"
import SelectButton from "../components/SelectButton"
import { ConfirmWindowShow } from "../components/ConfirmWindow"
import UploadFormInFormList from "../components/UploadFormInFormList"

const Home: NextPage = () => {
  const [files, setFiles] = useState<PDFFile[]>([])
  const [select,setSelect] = useState<boolean>(false)
  const [upload,setUpload] = useState<boolean>(false)
  const fileInput:any = useRef<HTMLInputElement>(null)

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
      console.log(files)
      setFiles(
        Array.from(files).map((file) => ({
          id: null,
          name: file.name,
          file: file,
          status: "none",
          isSelect: false
        }))
      )
    }
  }

  const onFormChangeInFilesList = (e: ChangeEvent<HTMLInputElement>) => {  //后续上传相关逻辑
    const filesList = e.target.files
    const tempFiles:PDFFile[] = files
    let isExist:boolean = false
    let existFiles:string[] = []

    if (filesList) {
        const addFilesList:PDFFile[] = Array.from(filesList).map((file) => ({
          id: null,
          name: file.name,
          file: file,
          status: "none",
          isSelect: false
        }))
        addFilesList.forEach((file) => {
          let innerExist:boolean = false
          for(let i=1; i<=tempFiles.length; i++){
            if(tempFiles[i-1].name == file.name){
              isExist = true
              innerExist = true
              existFiles.push(file.name)
              break
            }
          }
          if(!innerExist){
            tempFiles.push(file)            
          }
        })
        setFiles(tempFiles.map((file) => {return file}))
    }
    if(isExist){
      const cancelExist = () => {  //取消上传操作
        const window:any = document.getElementById("mask")
        window.parentNode.removeChild(window);
        isExist = false
      }
      const existFilesWindow:windowContent = {
        title: "Upload Error",
        operation: "These files've existed: ",
        fileslist: existFiles,
        confirmButton: null
      }
      ConfirmWindowShow(true,existFilesWindow,() => {},cancelExist)
    }
    fileInput.current.value = ""  //清空Input,使得重复上传相同文件时Input能够正确触发
  }

  const onSubmit = () => {    //onSubmit内部进行了 确认&取消 的封装 用于配合弹窗
    const cancelSubmit = () => {  //取消上传操作
      const window:any = document.getElementById("mask")
      window.parentNode.removeChild(window);
    }
    if(files.length == 0){
      const uploadWindowForNull:windowContent = {
        title: "Upload Error",
        operation: "Please choose at least ONE pdf file!",
        fileslist:[],
        confirmButton: null
      }
      ConfirmWindowShow(true,uploadWindowForNull,() => {},cancelSubmit)
      return
    }
    const confirmSubmit = () => {
      const window:any = document.getElementById("mask")  //删除弹窗
      window.parentNode.removeChild(window);
      
      if (files.length != 0) {  //执行原有上传逻辑
        const formData = new FormData()
        formData.append("sessionId", sessionId)
        files.forEach((file) => formData.append("files", file.file))
  
        setFiles((files) => files.map((file) => ({ ...file, status: "upload" })))
  
        fetch("https://epuber.tunkshif.one/api/upload", {
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
      setUpload(true)
    }

    const tempUploadFilesList:string[] = files.map((file) => {  //获取上传内容文件名数组  用于初始化弹窗
      return file.name
    })

    const submitWindowContent:windowContent = {   //初始化弹窗内容
      title: "Files Upload",
      operation: "These files will be uploaded: ",
      fileslist:tempUploadFilesList,
      confirmButton: "Upload"
    }
    ConfirmWindowShow(true,submitWindowContent,confirmSubmit,cancelSubmit)    //调出弹窗并传入 确认&取消 回调绑定到按钮实现不同逻辑执行
  }

  const DeleteSelectFile = (name:String) => {   //单个删除按钮的相关逻辑
    if(!select){
      setFiles((files) => _.filter(files,(file) => {
        return file.name != name
      }))
    }
    setFiles((files) => {
      return files.map((file) => {
        if(file.name == name){
          const tempSelect = !file.isSelect
          return({
            ...file,
            isSelect: tempSelect
          })
        }
        return file
      })
    })
  }

  const SelectToDelete = () => {    //select按钮的相关逻辑
    console.log("touch Select")
    if(select == false){  //select按钮在select状态下的点击食事务处理
      setFiles((files) =>
        files.map((file) => ({
          ...file,
          status:"selecting"
        }))
      )
      setSelect(!select)
    }else{  //delete状态下的按钮事务处理
      let isDelete:boolean = false
      let tempDeleteFilesList:string[] = []

      const confirmRemove = () => {   //弹窗确认回调 用于确认删除
        setFiles((files) => _.filter(files,(file) => {
          return file.isSelect == false
        }))
        setFiles((files) =>
          files.map((file) => ({
            ...file,
            status:"none",
            isSelect: false
          }))
        )
        const window:any = document.getElementById("mask")
        window.parentNode.removeChild(window);
        setSelect(!select)   
      }
    
      const cancelRemove = () => {    //弹窗取消回调 用于取消删除
        setFiles((files) =>
          files.map((file) => ({
            ...file,
            status:"none",
            isSelect: false
          }))
        )
        const window:any = document.getElementById("mask")
        window.parentNode.removeChild(window);  
        setSelect(!select)
      }

      files.forEach((file) => {   //检查文件队列中是否有被选中者
        if(file.isSelect == true){
          isDelete = true
          tempDeleteFilesList.push(file.name)
        }
      })
      const removeWindowContent:windowContent = {   //初始化文件删除弹窗内容
        title: "Files Remove",
        operation: "These files will be removed: ",
        fileslist: tempDeleteFilesList,
        confirmButton: "Confirm"
      }
      ConfirmWindowShow(isDelete,removeWindowContent,confirmRemove,cancelRemove)    //弹出弹窗 并传入 确认&取消 回调并绑定到按钮实现点出触发不同事务处理
      if(!isDelete){    //点击select后又未选中内容 用于在这种情况下从delete切换到select状态下的文件status状态的初始化
        setFiles((files) =>
          files.map((file) => ({
            ...file,
            status:"none",
            isSelect: false
          }))
        )
        setSelect(!select)
      }
    }
  }

  return (
    <Layout>
      <div>
        <div className="flex min-h-[360px] rounded-lg bg-white p-4 shadow-sm">
          {files.length == 0 ? (
            <UploadForm onChange={onFormChange} />
          ) : (
            <FileList files={files} onDelete={DeleteSelectFile} onChange={onFormChangeInFilesList} upload={upload} fileInput={fileInput} select={select} />
          )}
        </div>
        <div className="my-4 flex items-center justify-end">
          {files.length == 0 || upload ? (
            <div></div>
          ) : (
            <SelectButton onSelect={SelectToDelete} select={select}/>
          )}

          {select || upload ? (
            <div></div>
          ) : (
            <UploadButton onClick={onSubmit} />
          )}

        </div>
      </div>
    </Layout>
  )
}

export default Home
