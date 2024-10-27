// @ts-ignore
import Pikaso, { BaseShapes } from "pikaso"

// for creating circle 
const createCircle = (editor: Pikaso<BaseShapes>, shapeBg: string, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
    editor.shapes.circle.draw({
      fill: shapeBg,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
    })
  }
}

// for creating reactangle 
const createRectangle = (editor: Pikaso<BaseShapes>, shapeBg: string, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
    editor.shapes.rect.draw({
      fill: shapeBg,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    })
  }
}

// for creating line 
const createLine = (editor: Pikaso<BaseShapes>, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
    editor.shapes.line.draw({
      stroke: strokeColor,
      strokeWidth: strokeWidth
    })
    
  }
}

// for writing text
const createText = (editor: Pikaso<BaseShapes>, shapeBg: string)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
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
const createPencil = (editor: Pikaso<BaseShapes>, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.draw({
      stroke: strokeColor,
      strokeWidth: strokeWidth
    })
  }
}

// for creating triangle 
const createTriangle = (editor: Pikaso<BaseShapes>, shapeBg: string, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
    editor.shapes.triangle.draw({
      fill: shapeBg,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    })
  }
}

// for creating arrow 
const createArrow = (editor: Pikaso<BaseShapes>, shapeBg: string, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
    editor.shapes.arrow.draw({
      fill: shapeBg,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    })
  }
}

// for creating pentagon 
const createPentagon = (editor: Pikaso<BaseShapes>, shapeBg: string, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
    editor.shapes.polygon.draw({
      fill: shapeBg,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      sides: 5
    })
  }
}

// for creating hexagon 
const createHexagon = (editor: Pikaso<BaseShapes>, shapeBg: string, strokeColor: string, strokeWidth: number)=>{
  if(editor) {
    editor.shapes.pencil.stopDrawing();
    editor.shapes.polygon.draw({
      fill: shapeBg,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      sides: 6
    })
  }
}

export {
  createCircle,
  createRectangle,
  createLine,
  createPencil,
  createText,
  createTriangle,
  createArrow,
  createPentagon,
  createHexagon
}