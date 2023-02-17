import React, { useState } from 'react';

function StateEditor(props) {
  const [newStateName, setNewStateName] = useState('');

  function handleAddState() {
    props.onAddState(newStateName);
    setNewStateName('');
  }

  function handleDeleteState(stateName) {
    props.onDeleteState(stateName);
  }

  const stateList = props.states.map((stateName, index) => (
    <li key={index}>
      {stateName}
      <button onClick={() => handleDeleteState(stateName)}>Delete</button>
    </li>
  ));

  return (
    <div className="state-editor">
      <h2>State Editor</h2>
      <label>
        New State Name:
        <input
          type="text"
          value={newStateName}
          onChange={(e) => setNewStateName(e.target.value)}
        />
      </label>
      <button onClick={handleAddState}>Add State</button>
      <ul>
        {stateList}
      </ul>
    </div>
  );
}

export default StateEditor;