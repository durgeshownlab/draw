import React, { MouseEventHandler } from "react"
import { BiRedo, BiUndo } from "react-icons/bi"
import { BsDownload } from "react-icons/bs"
import { CiImageOn } from "react-icons/ci"
import { GrClear } from "react-icons/gr"
import { IoFolderOpenOutline, IoSaveOutline } from "react-icons/io5"
import { LuFlipHorizontal, LuFlipVertical } from "react-icons/lu"
import { RxBorderWidth } from "react-icons/rx"

interface Header {
  undo?: MouseEventHandler
  redo?: MouseEventHandler
  clearAll?: MouseEventHandler
  exportFile?: MouseEventHandler
  verticalFlip?: MouseEventHandler
  horizontalFlip?: MouseEventHandler
  shapeBg: string
  setShapeBg: Function
  strokeWidth: number
  setStrokeWidth: Function
  strokeColor: string
  setStrokeColor: Function
  toggleStroke: boolean
  setToggleStroke: Function
  strokePopupRef: React.RefObject<HTMLDivElement>
  insertImage: MouseEventHandler
  imageURL: string
  setimageURL: Function
  selectImage: File | null
  setSelectImage: Function
  selectImageRef: React.RefObject<HTMLInputElement>
  cancelInsertImage: MouseEventHandler
  selectImagePopupRef: React.RefObject<HTMLDivElement>
  toggleSelectImagePopup: boolean
  setToggleSelectImagePopup: Function
  exportJSON: MouseEventHandler
  setOpenFile: Function
  openFileRef: React.RefObject<HTMLInputElement>
}

const Header: React.FC<Header> = ({undo, redo, clearAll, exportFile, verticalFlip, horizontalFlip, shapeBg, setShapeBg, strokeColor, setStrokeColor, strokeWidth, setStrokeWidth, toggleStroke, setToggleStroke, strokePopupRef, insertImage, imageURL, setimageURL, selectImage, setSelectImage, selectImageRef, cancelInsertImage, selectImagePopupRef, toggleSelectImagePopup, setToggleSelectImagePopup, exportJSON, setOpenFile, openFileRef}) => {

  const showStrokePopup = (e: React.MouseEvent<HTMLDivElement>)=>{
    e.stopPropagation()
    setToggleStroke(!toggleStroke)
  }

  const handleFileUplaod = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(file) {
      const fileUrl = URL.createObjectURL(file);
      setimageURL(fileUrl)
      setSelectImage(file)
    }
  }

  const handleOpenFileUpload = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    if(file) {
      setOpenFile(file)
      if(openFileRef.current){
        openFileRef.current.value = ""
      }
    }
  }

  return (
    <div className="w-full h-full p-1 flex text-purple-600">
      <label 
        className="h-full aspect-square mx-1 flex justify-center items-center cursor-pointer rounded-md hover:bg-purple-200"
        title="Open File"
        htmlFor="open-file"
      >
        <input 
          type="file" 
          id="open-file" 
          className="hidden"
          ref={openFileRef}
          accept=".ds,.json"
          onChange={handleOpenFileUpload}
        />
        <IoFolderOpenOutline className="text-3xl" />
      </label>
      
      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Save"
        onClick={exportJSON}
      >
        <IoSaveOutline className="text-3xl" />
      </button>

      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Clear All"
        onClick={clearAll}
      >
        <GrClear className="text-3xl" />
      </button>
      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Undo"
        onClick={undo}
      >
        <BiUndo className="text-3xl" />
      </button>

      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Redo"
        onClick={redo}
      >
        <BiRedo className="text-3xl" />
      </button>

      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Export Image"
        onClick={exportFile}
      >
        <BsDownload className="text-3xl" />
      </button>

      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Flip Vertical"
        onClick={verticalFlip}
      >
        <LuFlipHorizontal className="text-3xl" />
      </button>

      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Flip Horizontal"
        onClick={horizontalFlip}
      >
        <LuFlipVertical className="text-3xl" />
      </button>

      <button 
        className="h-full aspect-square mx-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        title="Background Color" >
        <input 
          className="w-full h-full cursor-pointer"
          type="color" 
          value={shapeBg}
          onChange={e=>setShapeBg(e.target.value)} />
      </button>

      <div 
        className="h-full aspect-square mx-1 flex justify-center items-center relative cursor-pointer rounded-md hover:bg-purple-200"
        title="Stroke" onClick={showStrokePopup} ref={strokePopupRef} >
        
        <RxBorderWidth className="text-3xl" />

        {
          toggleStroke && 
          <div 
            className="w-48 h-fit p-1 mt-1 border rounded-md absolute top-full left-0 z-10 bg-white text-black text-sm flex flex-col shadow-xl"
            onClick={e=>e.stopPropagation()}
             >
            <label className="text-left mt-2">Border Width</label>
            <input 
              className="w-full h-10 p-1 text-black caret-slate-600 border rounded-md focus:outline-none" 
              type="number"
              value={strokeWidth}
              min={1}
              onChange={e=>setStrokeWidth(Number(e.target.value))}
              placeholder="eg. 5" />

            <label className="text-left mt-2">Color</label>
            <input 
              className="w-full h-10 text-black caret-slate-600 border rounded-md cursor-pointer focus:outline-none" 
              type="color"
              value={strokeColor}
              onChange={e=>setStrokeColor(e.target.value)} />
          </div>
        }
      </div>

      <div
        ref={selectImagePopupRef} 
        onClick={()=>setToggleSelectImagePopup(!toggleSelectImagePopup)}
        title="Image"
        className="h-full aspect-square mx-1 flex justify-center items-center relative cursor-pointer rounded-md hover:bg-purple-200"
      >
        <CiImageOn className="text-3xl" />

        {
          toggleSelectImagePopup && 
          <div 
            className="w-60 h-fit p-1 mt-1 border rounded-md absolute top-full left-0 z-10 bg-white text-black text-sm flex flex-col shadow-xl cursor-auto"
            onClick={e=>e.stopPropagation()} >
            <label className="block my-1">
              <input type="file" className="block w-full text-sm text-slate-500 cursor-pointer
                file:cursor-pointer
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
                ref={selectImageRef}
                onChange={handleFileUplaod} />
            </label>

            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-[1px] my-3 bg-gray-200 border-0 rounded dark:bg-gray-700" />
                <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
                  OR
                </div>
            </div>

            <label className="text-left mb-1">Image URL</label>
            <input 
              className="w-full h-10 p-1 text-black caret-slate-600 border rounded-md focus:outline-none" 
              type="url"
              value={imageURL}
              onChange={e=>setimageURL(e.target.value)}
              placeholder="eg. 5" />

            <div className="w-full h-32 my-2 rounded-md overflow-hidden">
              <img 
                src={imageURL || "https://datamesh.com/wp-content/uploads/2018/11/placeholder.png"}
                className="w-full h-full object-cover" 
                alt=""
                 />
            </div>

            <div className="w-full flex justify-end gap-1">
              <button className="w-20 mt-2 py-2 border rounded-full bg-purple-200 text-purple-500"
              onClick={cancelInsertImage} >Cancel</button>
              <button className="w-20 mt-2 py-2 border rounded-full bg-purple-600 text-white"
                onClick={insertImage}
                disabled={!selectImage && !imageURL.trim()} >Ok</button>
            </div>

          </div>
        }
      </div>
    </div>
  )
}

export default Header
