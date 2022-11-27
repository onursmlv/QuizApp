import { FormControl, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDispatch } from 'react-redux'
import { handleCountChange } from '../redux/action'

const TextBox = () => {
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        e.preventDefault();
        dispatch(handleCountChange(e.target.value));
    }
  return (
    <Box width="100%" mt={3}>
        <FormControl fullWidth size="small">
            <TextField onChange={handleChange} 
            label="Number of Questions"
            type="number"
            size="small"/>
        </FormControl>
    </Box>
  )
}

export default TextBox