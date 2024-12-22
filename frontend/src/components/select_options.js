import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import select_options_styles from "../../src/styles/select_options.module.css"
export default function Select_Options({ initialValue, label, options, onChange }) {
  const [selectedValue, setSelectedValue] = React.useState(initialValue);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <FormControl className={select_options_styles["form-control"]} sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel className={select_options_styles["select-label"]} id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={selectedValue}
        label={label}
        onChange={handleChange}
        className={select_options_styles["select-options"]}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value} className={select_options_styles["menu-item"]}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
