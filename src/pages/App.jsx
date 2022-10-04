import React from 'react'
import CustomInputNumber from '../components/CustomInputNumber'

function App() {
  return (
    <div className="app h-screen w-screen flex items-center justify-center">
      <CustomInputNumber min={0} max={20} name="count-1" value={10} step={3} />
    </div>
  )
}

export default App
