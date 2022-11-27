import { Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useHistory } from "react-router-dom";
import SelectBox from "../components/SelectBox"
import TextBox from "../components/TextBox";
import Axios from "../hooks/useAxios";

const Settings = () => {
    const {response,error,loading}=Axios({url:"/api_category.php"})
    const history =useHistory();

    if(loading){
        return(
            <Box>
                <CircularProgress />
            </Box>
        )
    };  

    if(error){
        return(
            <Typography color="red">
                Something bad happens :(
            </Typography>
        )
    };

    const difficultyOption=[
        {id:"easy", name :"Easy"},
        {id:"normal",name :"Normal"},
        {id:"hard",name :"Hard" }
    ];

    const typeOption=[
        {id:"multiple",name:"Multiple Choice"},
        {id:"boolean",name:"True/False"}
    ];

    const handleSubmit = (e) =>{
        e.preventDefault();
        history.push("/questions")
    };

  return (
    <form onSubmit={handleSubmit}>
        <SelectBox options={response.trivia_categories} label="Category" />
        <SelectBox options={difficultyOption} label="Difficulty" />
        <SelectBox options={typeOption} label="Type" />
        <TextBox  />
        <Box mt={3} width="100%">
            <Button variant="contained" type="submit" fullWidth>Start</Button>
        </Box>
    </form>
    );
};
export default Settings