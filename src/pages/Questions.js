import { Button, CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { decode } from 'html-entities'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { handleScoreChange } from '../redux/action'

const getRandomInt=(max)=>{
    return Math.floor(Math.random()*Math.floor(max))
}

const Questions = () => {
    const {
        question_difficulty,
        question_type,
        question_category,
        count_of_question,
        score
    } =useSelector((state)=>state)
    const history=useHistory();
    const dispatch = useDispatch();
    let apiUrl=`/api.php?amount=${count_of_question}`;
    if(question_category){
        apiUrl=apiUrl.concat(`&category=${question_category}`)
    }
    if(question_difficulty){
        apiUrl=apiUrl.concat(`&difficulty=${question_difficulty}`)
    }
    if(question_type){
        apiUrl=apiUrl.concat(`&type=${question_type}`)
    }

    const {response,loading} =useAxios({url:apiUrl})
    const [questionIndex,setQuestionIndex]=useState(0);
    const [options,setOptions]=useState([])

    useEffect(()=>{
        if(response?.results.length){
            const question=response.results[questionIndex];

            let answers=[...question.incorrect_answers];
            answers.splice(
                getRandomInt(question.incorrect_answers.length),
                0,
                question.correct_answer
            );
            setOptions(answers)
        }

    },[response, questionIndex])
    if(loading){
        return (
            <Box>
                <CircularProgress />
            </Box>
        )
    }
    const handleClickAnswer = (e) => {
        const question = response.results[questionIndex];


        if (e.target.textContent === question.correct_answer) {
          dispatch(handleScoreChange(score + 1));   
        }
    
        if (questionIndex + 1 < response.results.length) {
          setQuestionIndex(questionIndex + 1);
        } else {
          history.push("/final");
        }
      };
  return (
    response.results.length!==0?(
    <Box>
        <Typography variant="h5">QUESTION {questionIndex+1}</Typography>

        <Typography variant="h5" mt={5}>{decode(response.results[questionIndex].question)}</Typography>
        {options.map((data,id)=>(
            <Box mt={2} key={id}>
            <Button onClick={handleClickAnswer} variant='contained' fullWidth>{decode(data)}</Button>
            </Box>
        ))}
        <Box> Score : {score} / {response.results.length} </Box>
    </Box>
    ):<Typography>No questions for this category</Typography>
  )
}
export default Questions