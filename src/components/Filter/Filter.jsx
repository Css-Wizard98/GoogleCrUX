import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '@mui/material/Button';
import MultiSelect from '../MultiSelect/MultiSelect';
import Box from '@mui/material/Box';
import { filterOptions } from './filterOptions';

const Filter = ({ onClose, onSubmit, open }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Modal open={open} onClose={onClose} title="Select Filter">
      <Box sx={{ padding: '20px', backgroundColor: 'white' }}>
        <MultiSelect
          options={filterOptions}
          selectedValues={selectedOptions}
          onChange={setSelectedOptions}
          label="Filter Options"
        />

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={() => {
            onClose();
          }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={() => {
            onSubmit(selectedOptions);
          }}>
            Apply
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default Filter;