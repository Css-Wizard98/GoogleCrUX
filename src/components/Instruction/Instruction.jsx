import React from 'react';

const Instructions = () => {
  return (
    <div style={{ fontSize: '9px', position: 'fixed', bottom: '15px', right: '10px' }}>
      <ol style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
        <li>Enter URL(https://example.com) and hit enter.</li>
        <li>Click on search.</li>
      </ol>
    </div>
  );
};

export default Instructions;