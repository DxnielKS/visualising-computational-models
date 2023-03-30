import React from 'react'

const MemoryTape = () => {

  const [memory, setMemory] = useState([0,0,0])

  return (
    <>
    <div>MemoryTape</div>
    <div className="memoryTape">
      {memory}
    </div>
    </>
  )
}

export default MemoryTape