import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { handleCountChange, handleScoreChange } from "../redux/action";

const FinalScreen = () => {
  const {score,count_of_question} =useSelector(state=>state);
  
  const history=useHistory();

  const dispatch=useDispatch();

  const handleReturnSettings=()=>{

    dispatch(handleScoreChange(0));

    dispatch(handleCountChange(50));

    history.push('/')
  }
  return (
    <Box>
      <Typography variant="h2" fontWeight={'bold'}>Final Score : {Math.floor(((score*100)/count_of_question))}%</Typography>
      <Typography variant="h5">You marked {score} correct answers out of {count_of_question} questions</Typography>
      <Box mt={5}>
        <Button variant='contained' fullWidth  onClick={handleReturnSettings}>Back to settings</Button>
      </Box>
    </Box>
  )
}

export default FinalScreen