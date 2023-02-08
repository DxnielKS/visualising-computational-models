import React, { Component } from "react";

class MainPage extends Component {
  state = {
    tape: "",
    state: "q1",
    transitionFunction: {
      q1: {
        0: { state: "q2", tape: "1", move: "R" },
        1: { state: "q3", tape: "1", move: "L" }
      },
      q2: {
        0: { state: "q1", tape: "1", move: "R" },
        1: { state: "q3", tape: "1", move: "R" }
      },
      q3: {
        0: { state: "q3", tape: "1", move: "L" },
        1: { state: "q3", tape: "1", move: "L" }
      }
    }
  };

  handleInputChange = event => {
    this.setState({ tape: event.target.value });
  };

  handleRunSimulation = () => {
    const { tape, state, transitionFunction } = this.state;
    let currentTape = tape;
    let currentState = state;
    let currentPosition = 0;
    while (currentState !== "q3") {
      let currentChar = currentTape[currentPosition] || 0;
      let next = transitionFunction[currentState][currentChar];
      currentTape =
        currentTape.substring(0, currentPosition) +
        next.tape +
        currentTape.substring(currentPosition + 1);
      currentState = next.state;
      currentPosition += next.move === "R" ? 1 : -1;
    }
    this.setState({ tape: currentTape, state: currentState });
  };

  render() {
    return (
      <div>
        <h1>Turing Machine Simulator</h1>
        <label>
          Tape:
          <input
            type="text"
            value={this.state.tape}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>Current State: {this.state.state}</label>
        <br />
        <button onClick={this.handleRunSimulation}>Run Simulation</button>
      </div>
    );
  }
}

export default MainPage;
