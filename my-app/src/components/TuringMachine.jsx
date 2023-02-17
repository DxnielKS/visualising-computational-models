import React, { useState } from 'react';

function TuringMachine() {
  // Define the initial tape and head position
  const [tape, setTape] = useState(['0', '0', '0', '0', '0']);
  const [headPosition, setHeadPosition] = useState(0);

  // Define the possible states and transitions for the machine
  const [states, setStates] = useState([
    {
      name: 'state0',
      transitions: [
        { read: '0', write: '1', move: 'right', nextState: 'state1' },
        { read: '1', write: '0', move: 'left', nextState: 'state0' }
      ]
    },
    {
      name: 'state1',
      transitions: [
        { read: '0', write: '0', move: 'left', nextState: 'state0' },
        { read: '1', write: '1', move: 'right', nextState: 'state1' }
      ]
    }
  ]);

  // Define the initial current state of the machine
  const [currentState, setCurrentState] = useState('state0');

  // Define a function to update the tape and head position based on user input
  function handleBitClick(index) {
    const newTape = [...tape];
    newTape[index] = newTape[index] === '0' ? '1' : '0';
    setTape(newTape);
  }

  // Define a function to update the current state of the machine based on transitions
  function handleNextClick() {
    const currentBit = tape[headPosition];
    const state = states.find(state => state.name === currentState);
    const transition = state.transitions.find(t => t.read === currentBit);
    const newTape = [...tape];
    newTape[headPosition] = transition.write;
    setTape(newTape);
    setHeadPosition(headPosition + (transition.move === 'left' ? -1 : 1));
    setCurrentState(transition.nextState);
  }

  // Render the tape and state components with the current state and props
  return (
    <div>
      <MemoryTape tape={tape} headPosition={headPosition} onBitClick={handleBitClick} />
      <MachineState currentState={currentState} states={states} onNextClick={handleNextClick} />
    </div>
  );
}
