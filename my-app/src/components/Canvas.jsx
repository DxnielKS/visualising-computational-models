import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Stage, Layer, Rect, Text, Circle, Group, Arrow } from 'react-konva';
import Konva from 'konva'
import State from '../state.js'
import TuringMachine from '../turingMachine.js'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Button, Toolbar } from '@mui/material';

function Canvas() {


  const stageRef = useRef(null);
  const layerRef = useRef(null);

  const [layerRect, setLayerRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const statess = [new State('state-' + Date.now(), 'q0', true)]

  console.log(statess)

  const [states, setStates] = useState(statess)

  // list to store the memory tape
  const [memory, setMemory] = useState([0, 0, 0])

  // list to store transition tuples, initially empty
  const [transitions, setTransitions] = useState([])

  // initialise Turing machine with one initial state, empty memory and no transitions
  const [M, setMachine] = useState(new TuringMachine(transitions, states, memory))

  const handleDragStart = (e) => {
    const id = e.target.id();

    const layer = layerRef.current;

    // console.log(e.target.x(),e.target.y())

    // console.log(node.children)

    setStates(
      states.map((state) => {
        return {
          ...state,
          isDragging: (state.id === id),
        };
      })
    );

  };

  const handleDragEnd = (e) => {
    const id = e.target.id();

    const node = e.target;

    const layer = layerRef.current;

    // console.log(e.target.x(),e.target.y()

    setStates(
      states.map((state) => {
        return {
          ...state,
          isDragging: false,
        };
      })
    );

  };

  const handleDragMove = (e) => {
    if (!layerRef.current) return; // exit early if layerRef is not defined
    const id = e.target.id();
    const group = e.target;
    const layer = layerRef.current;
    const stage = stageRef.current;
    const stageRect = {
      width: stage.width(),
      height: stage.height()
    };
    const groupRect = group.getClientRect();
    // calculate the boundaries of the group within the stage
    const minX = 0;
    const maxX = stageRect.width - groupRect.width;
    const minY = 0;
    const maxY = stageRect.height - groupRect.height;
    // get the current position of the group
    const { x, y } = group.position();
    // clamp the x and y coordinates to the boundaries
    let newX = x
    let newY = y
    if (newX > maxX - 30) {
      newX = maxX - 30
    }
    else if (newX < 30) {
      newX = 30
    }
    if (newY > maxY) {
      newY = maxY
    }
    else if (newY < 0) {
      newY = 0
    }
    // set the new position of the group
    group.position({ x: newX, y: newY });
    // group.position({ x: 50, y: 50 });
  };

  // method to delete a state, need to also delete all transitions that contain that state.
  const handleDelete = (e) => {
    let node = e.target;
    node.destroy();
  }


  // when hovering, the state should glow blue
  const handleHover = (e) => {
    const id = e.target.id();

  }

  // method to draw a transition from one state to another
  const handleClick = (e) => {
    return;
  }

  const handleAddState = (e) => {
    console.log('state added')

    console.log(states)

    let CURRENT_STATES = states

    let NEW_STATE = new State('state' + Date.now(), 'q'+states.length)

    CURRENT_STATES.push(NEW_STATE)

    setStates(CURRENT_STATES);

  }

  const handleAddFinalState = (e) => {
    console.log('state added')

    for (let state of states){
      if (state.isAccepting){
        console.log('there already exists a final state!')
        return;
      }
    }

    console.log(states)

    let CURRENT_STATES = states

    let NEW_STATE = new State('state' + Date.now(), 'q'+states.length,false,true)

    CURRENT_STATES.push(NEW_STATE)

    setStates(CURRENT_STATES);
  }

  const handleRun = (e) => {

    console.log('started');

  }

  const handleClear = (e) => {

    console.log('clear')

  }

  useLayoutEffect(() => {
    if (!layerRef.current) return;
    const layer = layerRef.current;
    if (layer) {
      setLayerRect({
        x: layer.offsetLeft,
        y: layer.offsetTop,
        width: layer.offsetWidth,
        height: layer.offsetHeight,
      });
    }
  }, []);


  return (
    <>
      <Stage id='canvas' className="canvas" width={window.innerWidth} height={window.innerHeight * (2 / 3)} ref={stageRef}>
        <Layer ref={layerRef}>
          {states.map((state) => (
            <Group

              key={state.id}
              id={state.id}

              x={30}
              y={30}

              // each group/state needs to be draggable
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragMove={handleDragMove}
              onMouseOver={handleHover}
              // start drawing a transition arrow
              onClick={handleClick}
              onDblClick={handleDelete}
              scaleX={state.isDragging ? 1.2 : 1}
              scaleY={state.isDragging ? 1.2 : 1}

            // shadowOffsetX={state.isDragging ? 50 : 0}
            // shadowOffsetY={state.isDragging ? 50 : 0}
            // shadowBlur={state.isDragging ? 10 : 0}

            >
              <Text text={state.name} fontSize={20} />
              <Circle stroke={state.isAccepting ? (state.isInitial? 'black' : 'green') : (state.isInitial ? 'blue' : 'black')} radius={30} />
            </Group>
          ))}
        </Layer>
      </Stage>
      <Button variant="contained" endIcon={<PlayCircleFilledWhiteIcon />} onClick={handleRun}>
        Start
      </Button>
      <Button variant="contained" onClick={handleAddState}>
        Add State
      </Button>
      <Button variant="contained" onClick={handleAddFinalState}>
        Add Final State
      </Button>
      <Button variant="contained">
        Add Memory Tape
      </Button>
      <Button variant="contained" onClick={handleClear}>
        Clear Canvas
      </Button>
    </>
  );
}

export default Canvas