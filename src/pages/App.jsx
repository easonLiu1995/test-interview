import React, { useId, useState } from 'react'
import RoomAllocation from '../components/RoomAllocation'

const mockData = Array(Math.ceil(Math.random() * 5))
  .fill(null)
  .map(() => {
    const storedRandom = Math.ceil(Math.random() * 5)
    return {
      room: storedRandom,
      guest: storedRandom * Math.ceil(Math.random() * 5) + 5
    }
  })

function App() {
  const [customer] = useState(mockData)
  const id = useId()

  return (
    <div className="app flex items-start flex-wrap w-3/4 mx-auto py-10">
      {customer.map((el, key) => (
        <RoomAllocation
          guest={el.guest}
          room={el.room}
          key={id + key}
          onChange={({ roomData }) => console.log(`room: ${key + 1}`, roomData)}
        />
      ))}
    </div>
  )
}

export default App
