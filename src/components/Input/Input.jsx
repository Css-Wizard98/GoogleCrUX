import React, { useRef, useState } from 'react';
import './Input.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const Input = ({}) => {
  const [data, setData] = useState([]);
  const INPUT = useRef();

  const handleEnterPress = (e) => {
    console.log(e.key);
    if (e.key !== 'Enter') return;
    let value = INPUT.current.value;
    console.log(value);
    if (!value || data.includes(value)) return;

    setData((prev) => {
      return [...prev, value];
    });
    INPUT.current.value = '';
  };

  const handleRemoveItem = (itemToRemove) => {
    setData((prevData) => prevData.filter((item) => item !== itemToRemove));
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
        <Button variant="contained" size="large">Search</Button>
      </div>
      <div className="item-list">
        {data.map((item) => <span className="item-capsule" key={item}>{item} <CloseIcon className="close-icon" onClick={() => handleRemoveItem(item)} /></span>)}
      </div>
    </div>
  );
};
export default Input;