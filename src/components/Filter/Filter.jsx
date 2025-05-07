import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '@mui/material/Button';
import MultiSelect from '../MultiSelect/MultiSelect';
import Box from '@mui/material/Box';
import { filterOptions, filterOptionValueToLabel } from './filterOptions';
import './Filter.css'


const Filter = ({ onClose, onSubmit, open, filterData }) => {
  const [selectedOptions, setSelectedOptions] = useState([...filterData.metrics]);
  const [thresholdValues, setThresholdValues] = useState({...filterData.threshold});

  const handleThresholdUpdate = (value,type) => {
    value = +value
    if(value<=0){
      setThresholdValues({...thresholdValues,[type]:0})
    }else{
      setThresholdValues({...thresholdValues,[type]:Number(value)})
    }
  }
  return (
    <Modal open={open} onClose={onClose} title="Select Filter" action={
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => {
          let thresholdFilterOn = false;
          Object.keys(thresholdValues).forEach(key => {
            if (thresholdValues[key]) {
              thresholdFilterOn = true;
            }
          })
          onSubmit({
            metrics: selectedOptions, threshold: thresholdValues, thresholdFilterOn
          })
        }}>
          Apply
        </Button>
      </div>
    }>
      <Box sx={{ padding: '20px', backgroundColor: 'white' }}>
        <MultiSelect
          options={filterOptions}
          selectedValues={selectedOptions}
          onChange={setSelectedOptions}
          label="Filter Options"
        />
        <div className='threshold-container' style={{marginTop:10}}>
          {
            filterOptions.map(el => {
              return (
                <div className='threshold-row' key={el.value}>
                  <label>{filterOptionValueToLabel[el.value]}:</label>
                  <input type="number" value={thresholdValues[el.value]} onChange={(e)=>handleThresholdUpdate(e.target.value,el.value)} />
                </div>
              )
            })
          }
        </div>
      </Box>
    </Modal>
  );
};

export default Filter;