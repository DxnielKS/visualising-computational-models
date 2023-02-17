import React from 'react';

function MemoryTape(props) {
  const { tape, headPosition, onBitClick } = props;

  // Render the tape as a row of clickable bit elements
  const tapeBits = tape.map((bit, index) => (
    <div
      key={index}
      className={`tape-bit ${index === headPosition ? 'head' : ''}`}
      onClick={() => onBitClick(index)}
    >
      {bit}
    </div>
  ));

  return (
    <div className="memory-tape">
      {tapeBits}
    </div>
  );
}

export default MemoryTape;
