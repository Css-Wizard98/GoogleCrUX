import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

const MultiSelect = ({ options, selectedValues, onChange, label }) => {
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (<FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select labelId={`${label}-label`} id={`${label}-select`} multiple value={selectedValues} onChange={handleChange} renderValue={(selected) => selected.map((value) => {
        const option = options.find((o) => o.value === value)
        return option?.label;
      }).join(', ')} label={label}>
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <MenuItem key={option.value} value={option.value}>
              <Checkbox checked={isSelected} />
              <ListItemText primary={option.label} />
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  );
}

export default MultiSelect;
