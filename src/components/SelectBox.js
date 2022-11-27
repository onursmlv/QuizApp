import { InputLabel ,Box,MenuItem,FormControl,Select} from '@mui/material'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { handleDifficultyChange, handleCategoryChange, handleTypeChange } from '../redux/action';

const SelectBox = (props) => {
    const {label,options}=props;
    const [value,setValue]=useState("");
    const dispatch=useDispatch();
    const handleChange = (e) => {
    setValue(e.target.value);
    switch (label) {
      case "Category":
        dispatch(handleCategoryChange(e.target.value));
        break;
      case "Difficulty":
        dispatch(handleDifficultyChange(e.target.value));
        break;
      case "Type":
        dispatch(handleTypeChange(e.target.value));
        break;
      default:
        return;
    }
  };
  return (
    <Box width="100%" mt={3}>
        <FormControl size='small' fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={handleChange}>
                {options.map(({id,name})=>(
                    <MenuItem value={id} key={id}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </Box>
  )
}
export default SelectBox