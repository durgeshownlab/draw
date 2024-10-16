import { useEffect, useRef, useState } from 'react';
import './App.css'
import Editor from './components/editor/Editor'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import usePikaso from "pikaso-react-hook";


function App() {
  
  const [editorRef, editor] = usePikaso();
  const [shapeBg, setShapeBg] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState<number>(1);
  const [strokeColor, setStrokeColor] = useState("#ffffff");
  const [toggleStroke, setToggleStroke] = useState<boolean>(false)
  const [imageURL, setimageURL] = useState<string>("")
  const [selectImage, setSelectImage] = useState<File | null>(null)
  // const [openFileURL, setOpenFile] = useState<File | null>(null)
  const [openFile, setOpenFile] = useState<File | null>(null)
  const [toggleSelectImagePopup, setToggleSelectImagePopup] = useState<boolean>(false)

  const strokePopupRef = useRef<HTMLDivElement | null>(null);
  const selectImagePopupRef = useRef<HTMLDivElement | null>(null);
  const selectImageRef = useRef<HTMLInputElement | null>(null);
  const openFileRef = useRef<HTMLInputElement | null>(null);

  // for creating circle 
  const createCircle = ()=>{
    if(editor) {
      editor.shapes.circle.draw({
        fill: shapeBg,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })
    }
  }

  // for creating reactangle 
  const createRectangle = ()=>{
    if(editor) {
      editor.shapes.rect.draw({
        fill: shapeBg,
        stroke: strokeColor,
        strokeWidth: strokeWidth
      })
    }
  }

  // for creating line 
  const createLine = ()=>{
    if(editor) {
      editor.shapes.line.draw({
        stroke: strokeColor,
        strokeWidth: strokeWidth
      })
      
    }
  }

  // for writing text
  const createText = ()=>{
    if(editor) {
      editor.shapes.label.insert({
        container: {
          x: 20,
          y: 20
        },
        text: {
          text: "Write Text",
          fill: shapeBg,
          fontSize: 40
        }
      })
    }
  }

  // for creating drawing with pencil
  const createPencil = ()=>{
    if(editor) {
      editor.shapes.pencil.draw({
        stroke: strokeColor,
        strokeWidth: strokeWidth
      })
    }
  }

  const insertImage = ()=> {
    if (editor && imageURL && imageURL.trim()!=="") {
      editor.shapes.image.insert(imageURL, {
        x: 20,
        y: 20,
      });

      setimageURL("")
      setSelectImage(null)
      setToggleSelectImagePopup(false)
      if(selectImageRef.current) {
        selectImageRef.current.value = ""
      }
    }
  }


  const cancelInsertImage = ()=> {
    setimageURL("")
    setSelectImage(null)
    setToggleSelectImagePopup(false)
    if(selectImageRef.current) {
      selectImageRef.current.value = ""
    }
  }

  // for undo 
  const undo = ()=> {
    if(editor) {
      editor.undo();
    }
  }

  // for redo 
  const redo = ()=> {
    if(editor) {
      editor.redo();
    }
  }

  // for redo 
  const clearAll = ()=> {
    if(editor) {
      editor.reset();
    }
  }

  // export image 
  const exportImage = ()=>{
    if(editor) {
      const imageUrl: string = editor.export.toImage({
        height: editor.board.getDimensions().height,
        width: editor.board.getDimensions().width,
        quality: 2000,
        mimeType: 'jpg'
      })
  
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = imageUrl;
      link.download = "Poster.png";
      link.click();
    }
  }

  //export to json
  const exportJSON = ()=>{
    if(editor) {
      const jsonData = editor.export.toJson()
      console.log(jsonData)
      const blobData = new Blob([JSON.stringify(jsonData, null, 2)], {type: "application/json"});

      const link = document.createElement('a')
      link.href = URL.createObjectURL(blobData)
      link.download = "project.ds"
      link.click()
    }
  }

  // import from json
  const importJSON = ()=>{
    if(editor && openFile) {
      const fileReader = new FileReader()
      fileReader.onload = async (e)=>{
        try {
          const jsonData = await JSON.parse(e.target?.result as string)
          editor.import.json(jsonData)
          setOpenFile(null)
        } catch (error) {
          alert("Failed to import the file, Please try again")
        }
      }
      fileReader.readAsText(openFile)
    }
  }

  const verticalFlip = ()=>{
    if(editor) {
      editor.flip.vertical(editor.selection.shapes)
    }
  }

  const horizontalFlip = ()=>{
    if(editor) {
      editor.flip.horizontal(editor.selection.shapes)
    }
  }

  const changeBackgroundColor = ()=>{
    if(editor) {
      const selectedShapes = editor.selection.shapes
      if(selectedShapes.length > 0) {
        selectedShapes.forEach((shape)=>{
          shape.update({
            fill: shapeBg
          })
        })
      }
    }
  }

  const changeStroke = ()=>{
    if(editor) {
      const selectedShapes = editor.selection.shapes
      if(selectedShapes.length > 0) {
        selectedShapes.forEach((shape)=>{
          shape.update({
            stroke: strokeColor,
            strokeWidth: strokeWidth
          })
        })
      }
    }
  }

  useEffect(()=>{
    changeBackgroundColor()
  }, [shapeBg])

  useEffect(()=>{
    if(strokeWidth>0) {
      changeStroke()
    }
  }, [strokeColor, strokeWidth])


  const handleClickOutside = (event: MouseEvent) => {
    if (strokePopupRef.current && !strokePopupRef.current.contains(event.target as Node)) {
      setToggleStroke(false); // Close the popup if clicked outside
    }

    if (selectImagePopupRef.current && !selectImagePopupRef.current.contains(event.target as Node)) {
      setToggleSelectImagePopup(false); // Close the popup if clicked outside
    }
  }

  useEffect(()=>{
    document.addEventListener("mousedown", handleClickOutside);

    return ()=>document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(()=>{
    if(openFile) {
      importJSON()
    }
  }, [openFile])
  
  return (
    <>
      <div className="w-full h-svh flex flex-col" >
        <div className="w-full h-14 bg-purple-100 flex-initial">
          <Header 
            undo={undo}
            redo={redo}
            clearAll={clearAll}
            exportFile={exportImage}
            verticalFlip={verticalFlip}
            horizontalFlip={horizontalFlip}
            shapeBg={shapeBg}
            setShapeBg={setShapeBg}
            strokeColor={strokeColor}
            setStrokeColor={setStrokeColor}
            strokeWidth={strokeWidth}
            setStrokeWidth={setStrokeWidth}
            toggleStroke={toggleStroke}
            setToggleStroke={setToggleStroke}
            strokePopupRef={strokePopupRef}
            insertImage={insertImage}
            imageURL={imageURL}
            setimageURL={setimageURL}
            selectImage={selectImage}
            setSelectImage={setSelectImage}
            selectImageRef={selectImageRef}
            cancelInsertImage={cancelInsertImage}
            selectImagePopupRef={selectImagePopupRef}
            toggleSelectImagePopup={toggleSelectImagePopup}
            setToggleSelectImagePopup={setToggleSelectImagePopup}
            exportJSON={exportJSON}
            setOpenFile={setOpenFile}
            openFileRef={openFileRef}/>
        </div>

        <div className="w-full h-full flex-initial flex">
          <div className="w-14 h-full bg-purple-100">
            <Sidebar 
              createCircle={createCircle} 
              createRectangle={createRectangle} 
              createLine={createLine}
              createText={createText}
              createPencil={createPencil} />
          </div>

          <div className="w-full h-full bg-white flex items-center">
            <Editor editorRef={editorRef} />
          </div>

        </div>

      </div>
    </>
  )
}

export default App
