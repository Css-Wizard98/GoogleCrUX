import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import Button from '@mui/material/Button';
import MultiSelect from '../MultiSelect/MultiSelect';
import Box from '@mui/material/Box';
const filterOptions = [
  { label: "cumulative_layout_shift", value: "cumulative_layout_shift" },
  { label: "first_contentful_paint", value: "first_contentful_paint" },
  { label: "interaction_to_next_paint", value: "interaction_to_next_paint" },
  { label: "largest_contentful_paint", value: "largest_contentful_paint" },
  { label: "experimental_time_to_first_byte", value: "experimental_time_to_first_byte" },
  { label: "largest_contentful_paint_resource_type", value: "largest_contentful_paint_resource_type" },
  { label: "largest_contentful_paint_image_time_to_first_byte", value: "largest_contentful_paint_image_time_to_first_byte" },
  { label: "largest_contentful_paint_image_resource_load_delay", value: "largest_contentful_paint_image_resource_load_delay" },
  { label: "largest_contentful_paint_image_resource_load_duration", value: "largest_contentful_paint_image_resource_load_duration" },
  { label: "largest_contentful_paint_image_element_render_delay", value: "largest_contentful_paint_image_element_render_delay" },
  { label: "navigation_types", value: "navigation_types" },
  { label: "round_trip_time", value: "round_trip_time" },
];

const Filter = ({ onClose, onSubmit, open }) => {
  const [selectedOptions, setSelectedOptions] = useState(filterOptions.map(el => el.value));

  useEffect(()=>{
    onSubmit(selectedOptions);
  },[])
  
  return (
    <Modal open={open} onClose={onClose} title="Select Filter">
      <Box sx={{ padding: '20px', backgroundColor: 'white' }}>
        <MultiSelect
          options={filterOptions}
          selectedValues={selectedOptions}
          onChange={setSelectedOptions}
          label="Filter Options"
        />
        
        <div style={{ marginTop: '20px', display:'flex', gap:'10px', justifyContent:'flex-end' }}>
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