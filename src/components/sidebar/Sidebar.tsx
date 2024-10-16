import React, { MouseEventHandler } from "react"
import { FaRegSquare } from "react-icons/fa"
import { GoPencil } from "react-icons/go"
import { LuCircle } from "react-icons/lu"
import { MdOutlineMaximize } from "react-icons/md"
import { RxText } from "react-icons/rx"

interface SideBar {
  createCircle?: MouseEventHandler
  createRectangle?: MouseEventHandler
  createLine?: MouseEventHandler
  createText?: MouseEventHandler
  createPencil?: MouseEventHandler
}

const Sidebar: React.FC<SideBar> = ({createCircle, createRectangle, createLine, createText, createPencil}) => {
  return (
    <div className="w-full h-full p-1 text-purple-800">
      <button 
        className="w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200"
        onClick={createCircle}
        title="Circle" >
        <LuCircle className="text-3xl" />
      </button>

      <button 
        className="w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200" 
        onClick={createRectangle}
        title="Rectangle" >
        <FaRegSquare className="text-3xl" />
      </button>

      <button 
        className="w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200" 
        onClick={createLine}
        title="Line" >
        <MdOutlineMaximize className="text-3xl" />
      </button>

      <button 
        className="w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200" 
        onClick={createText}
        title="Text" >
        <RxText className="text-3xl" />
      </button>

      <button 
        className="w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200" 
        onClick={createPencil}
        title="Text" >
        <GoPencil className="text-3xl" />
      </button>
    </div>
  )
}

export default Sidebar
