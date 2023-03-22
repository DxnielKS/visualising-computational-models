import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Group } from 'react-konva';


import State from '../state.js'
import TuringMachine from '../turingMachine.js'

function Canvas() {
  const stageRef = useRef(null);
  const [states, setStates] = useState(null)

  // make a new initial state
  let INITIAL_STATE = new State("0", 'q0', window.innerWidth / 2, window.innerHeight / 4, true)

  // list to store all states
  let STATES = [INITIAL_STATE]

  // list to store transition tuples, initially empty
  let TRANSITIONS = []

  // list to store the memory tape
  let MEMORYTAPE = []

  // initialise Turing machine with one initial state, empty memory and no transitions
  let M = new TuringMachine(TRANSITIONS, STATES, MEMORYTAPE);

  return (
    <Stage className="canvas" width={window.innerWidth} height={window.innerHeight / 2} ref={stageRef}>
      <Layer>
        {STATES.map((state) => (
          <Group
            draggable
            key={state.id}
            id={state.id}
            shadowColor='rgba(0, 0, 0, 0)'
            shadowOffsetX={0}
            shadowOffsetY={0}
            shadowBlur={0}
          >
            <Text x={190} y={190} text={state.getName()} fontSize={15} />
            <Circle x={200} y={200} stroke="black" radius={30} />
          </Group>
        ))}
        {TRANSITIONS.map(() => (
          <></>
        ))}
      </Layer>
    </Stage>
  );
}

export default Canvas