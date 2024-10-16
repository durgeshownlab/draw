import React from "react";
interface Editor {
  editorRef: React.RefObject<HTMLDivElement>
}

const Editor: React.FC<Editor> = ({editorRef}) => {
   
  return (
    <div className="w-10/12 h-5/6 mx-auto my-auto bg-green-500" ref={editorRef}>
    </div>
  )
}

export default Editor
