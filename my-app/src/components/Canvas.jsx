import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Circle, Group } from 'react-konva';

import State from '../state.js'
import TuringMachine from '../turingMachine.js'


function Canvas() {

  // make a new initial state
  let INITIAL_STATE = new State('q0', true)

  // list to store all states
  let STATES = [INITIAL_STATE, new State('q1')]

  // list to store transition tuples, initially empty
  let TRANSITIONS = []

  // list to store the memory tape
  let MEMORYTAPE = []

  // initialise Turing machine with one initial state, empty memory and no transitions
  let M = new TuringMachine(TRANSITIONS, STATES, MEMORYTAPE);

  return (
    <Stage className="canvas" width={window.innerWidth} height={window.innerHeight / 2} background="#000000">
      <Layer>
        {STATES.map((state) => (
          <Group draggable>
            <Text x={195} y={195} text={state.getName()} />
            <Circle x={200} y={200} stroke="black" radius={30} />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
}

export default Canvas