import React from 'react';

function Export(props) {
  const handleButton1Click = () => {
    // handle button 1 click here
  };

  const handleButton2Click = () => {
    // handle button 2 click here
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <p>This is a popup window</p>
        <button onClick={handleButton1Click}>Button 1</button>
        <button onClick={handleButton2Click}>Button 2</button>
      </div>
    </div>
  );
}

export default Export;
