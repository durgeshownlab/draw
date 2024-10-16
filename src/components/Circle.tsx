// import React from 'react'
import usePikaso from 'pikaso-react-hook'

export function Circle() {
  const [ref, editor] = usePikaso()
  
  const createCircle = () => {
    if(editor) {
      editor.shapes.circle.insert({
        x: 200,
        y: 200,
        radius: 50,
        fill: 'red'
      })
    }
  }

  return (
    <>
      <div
        ref={ref}
        className='w-full h-svh bg-slate-400'
      />
      
      <button onClick={createCircle}>Create Circle</button>
    </>
  )
}