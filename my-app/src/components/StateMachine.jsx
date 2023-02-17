import React, { useState } from 'react';

function StateMachine(props) {
  const [selectedState, setSelectedState] = useState(null);

  function handleStateClick(state) {
    setSelectedState(state);
  }

  function handleCanvasClick() {
    setSelectedState(null);
  }

  function handleCanvasDrop(e) {
    e.preventDefault();

    // Get the coordinates of the drop
    const canvasRect = e.target.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    // Create a new state and add it to the list
    const newState = { x, y, label: `q${props.states.length}` };
    props.setStates([...props.states, newState]);
  }

  function handleStateDrag(e, state) {
    e.dataTransfer.setData('state', JSON.stringify(state));
  }

  function handleStateDrop(e) {
    e.preventDefault();

    // Get the state data from the dataTransfer object
    const state = JSON.parse(e.dataTransfer.getData('state'));

    // Create a new transition and add it to the list
    const newTransition = {
      from: selectedState.label,
      to: state.label,
      label: '0 -> 1',
    };
    props.setTransitions([...props.transitions, newTransition]);

    // Deselect the current state
    setSelectedState(null);
  }

  return (
    <div>
      <canvas
        width={600}
        height={400}
        onClick={handleCanvasClick}
        onDrop={handleCanvasDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {props.states.map((state) => (
          <div
            key={state.label}
            style={{ position: 'absolute', left: state.x, top: state.y }}
            onClick={() => handleStateClick(state)}
            onDragStart={(e) => handleStateDrag(e, state)}
            onDragEnd={() => setSelectedState(null)}
            draggable
          >
            {state.label}
          </div>
        ))}
        {props.transitions.map((transition, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: (props.states.find((s) => s.label === transition.from).x +
                props.states.find((s) => s.label === transition.to).x) /
                2,
              top: (props.states.find((s) => s.label === transition.from).y +
                props.states.find((s) => s.label === transition.to).y) /
                2,
            }}
          >
            {transition.label}
          </div>
        ))}
      </canvas>
      {selectedState && (
        <div
          style={{
            position: 'absolute',
            left: selectedState.x,
            top: selectedState.y + 30,
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleStateDrop}
        >
          Drag here to create a new transition
        </div>
      )}
    </div>
  );
}

export default StateMachine;