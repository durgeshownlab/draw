import { useEffect, useRef, useState } from 'react';
import './App.css'
import Editor from './components/editor/Editor'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import usePikaso from "pikaso-react-hook";
import { createArrow, createCircle, createHexagon, createLine, createPencil, createPentagon, createRectangle, createText, createTriangle } from './features/shapes/shapes';
import Pikaso, { BaseShapes } from 'pikaso';


function App() {
  
  const [editorRef, editor] = usePikaso({
    snapToGrid: {
      strokeWidth: 1,
      stroke: "purple",
      dash: [5],
    },
    measurement: {
      margin: 20,
      background: {
        cornerRadius: 5,
        fill: "#ffffff",
        stroke: "purple",
        strokeWidth: 1
        
      },
      text: {
        fill: "purple",
        padding: 5,
        fontSize: 12,
        fontStyle: 'bold'
      }
    },
    selection: {
      transformer: {
        anchorFill: 'purple',
        borderStroke: 'purple',
        borderStrokeWidth: 2,
        anchorCornerRadius: 10
      }
    }
  });

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
  const [currentShape, setCurrentShape] = useState<string>("")


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

  const drawGrid = (editor: Pikaso<BaseShapes>, gridSize: number, color: string, lineWidth: number) => {
    const canvasWidth = editor.board.getDimensions().width;
    const canvasHeight = editor.board.getDimensions().height;
  
    // Draw vertical lines
    for (let x = 0; x <= canvasWidth; x += gridSize) {
      editor.shapes.line.draw({
        points: [x, 0, x, canvasHeight],
        stroke: color,
        strokeWidth: lineWidth,
      });
    }
  
    // Draw horizontal lines
    for (let y = 0; y <= canvasHeight; y += gridSize) {
      editor.shapes.line.draw({
        points: [0, y, canvasWidth, y],
        stroke: color,
        strokeWidth: lineWidth,
      });
    }
  };

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

  const drawShape = ()=> {
    if(editor) {
      switch(currentShape) {
        case 'circle': {
          createCircle(editor, shapeBg, strokeColor, strokeWidth)
          break;
        }
        case 'rectangle': {
          createRectangle(editor, shapeBg, strokeColor, strokeWidth)
          break;
        }
        case 'line': {
          createLine(editor, strokeColor, strokeWidth)
          break;
        }
        case 'text': {
          createText(editor, shapeBg)
          break;
        }
        case 'pencil': {
          createPencil(editor, strokeColor, strokeWidth)
          break;
        }
        case 'triangle': {
          createTriangle(editor, shapeBg, strokeColor, strokeWidth)
          break;
        }
        case 'arrow': {
          createArrow(editor, shapeBg, strokeColor, strokeWidth)
          break;
        }
        case 'pentagon': {
          createPentagon(editor, shapeBg, strokeColor, strokeWidth)
          break;
        }
        case 'hexagon': {
          createHexagon(editor, shapeBg, strokeColor, strokeWidth)
          break;
        }
      }
      
    }
  }

  useEffect(()=>{
    drawShape()
  }, [currentShape])

  const handleMouseLeave = (event: MouseEvent)=>{
    if(editorRef.current && editorRef.current.contains(event.target as Node)) {
      setCurrentShape("")
    }
  }

  useEffect(()=>{
    document.addEventListener("mouseup", handleMouseLeave)

    return ()=>document.removeEventListener("mouseup", handleMouseLeave)
  }, [])
  
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
              currentShape={currentShape}
              setCurrentShape={setCurrentShape} />
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
