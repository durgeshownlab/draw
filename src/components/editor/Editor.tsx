import React from "react";
interface Editor {
  editorRef: React.RefObject<HTMLDivElement>
}

const Editor: React.FC<Editor> = ({editorRef}) => {
   
  return (
    <div className="w-full h-full mx-auto my-auto bg-gray-200 " ref={editorRef}>
    </div>
  )
}

export default Editor
