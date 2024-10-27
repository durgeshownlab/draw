import React from "react"
import { CgArrowTopRight } from "react-icons/cg"
import { FaRegSquare } from "react-icons/fa"
import { GoPencil } from "react-icons/go"
import { IoTriangleOutline } from "react-icons/io5"
import { LuCircle, LuHexagon } from "react-icons/lu"
import { MdOutlineMaximize, MdOutlinePentagon } from "react-icons/md"
import { RxText } from "react-icons/rx"

interface SideBar {
  currentShape: string
  setCurrentShape: Function
}

const Sidebar: React.FC<SideBar> = ({currentShape, setCurrentShape}) => {
  return (
    <div className="w-full h-full p-1 text-purple-800">
       <button 
        className={`w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='pencil'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("pencil")}
        title="Pencil" >
        <GoPencil className="text-3xl" />
      </button>
      
      <button 
        className={`w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='circle'?'bg-purple-300':''}`}
        onClick={()=>setCurrentShape("circle")}
        title="Circle" >
        <LuCircle className="text-3xl" />
      </button>

      <button 
        className={`w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='rectangle'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("rectangle")}
        title="Rectangle" >
        <FaRegSquare className="text-3xl" />
      </button>

      <button 
        className={`w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='line'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("line")}
        title="Line" >
        <MdOutlineMaximize className="text-3xl" />
      </button>

      <button 
        className={`w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='text'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("text")}
        title="Text" >
        <RxText className="text-3xl" />
      </button>

      <button 
        className={`w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='triangle'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("triangle")}
        title="Triangle" >
        <IoTriangleOutline className="text-3xl" />
      </button>

      <button 
        className={`w-full aspect-square my-1 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='arrow'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("arrow")}
        title="Arrow" >
        <CgArrowTopRight className="text-3xl" />
      </button>

      <button 
        className={`w-full aspect-square my-1 p-2 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='pentagon'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("pentagon")}
        title="Ellipse" >
        <MdOutlinePentagon className="text-3xl" />
      </button>

      <button 
        className={`w-full aspect-square my-1 p-2 flex justify-center items-center rounded-md hover:bg-purple-200 ${currentShape==='hexagon'?'bg-purple-300':''}`} 
        onClick={()=>setCurrentShape("hexagon")}
        title="Ellipse" >
        <LuHexagon className="text-3xl" />
      </button>


    </div>
  )
}

export default Sidebar
