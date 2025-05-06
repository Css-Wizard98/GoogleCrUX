import React, { useRef, useState } from 'react';
import './Input.css';
import TextField from '@mui/material/TextField';

import CloseIcon from '@mui/icons-material/Close';

const Input = ({validate, onSelect}) => {
  const [data, setData] = useState([]);
  const INPUT = useRef();

  const handleEnterPress = (e) => {
    if (e.key !== 'Enter') return;
    let value = INPUT.current.value;
    if (!value || data.includes(value)) return;
    if(validate && !validate(value)) return;
    let tempVal = [...data,value];
    setData(tempVal);
    if(onSelect) onSelect(tempVal)
    INPUT.current.value = '';
  };

  const handleRemoveItem = (itemToRemove) => {
    let tempVal = [...data];
    tempVal = tempVal.filter((item) => item !== itemToRemove)
    setData(tempVal);
    if(onSelect) onSelect(tempVal)
  };
  return (
    <div className="input-container">
      <div className="input-field">
        <TextField
          inputRef={INPUT}
          id="outlined-search"
          label="Search field"
          type="search"
          fullWidth
          onKeyDown={handleEnterPress}
        />
      </div>
      <div className="item-list">
        {data.map((item) => <span className="item-capsule" key={item}>{item} <CloseIcon className="close-icon" onClick={() => handleRemoveItem(item)} /></span>)}
      </div>
    </div>
  );
};
export default Input;