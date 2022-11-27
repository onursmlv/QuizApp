import axios from 'axios';
import { useEffect, useState } from 'react'

axios.defaults.baseURL="https://opentdb.com/"
const useAxios = ({url}) => {
    const [response,setResponse]=useState(null);
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true)

    useEffect( ()=>{
        const getData =()=>{
            axios
            .get(url)
            .then(res=>setResponse(res.data))
            .catch(err=>setError(err))
            .finally(()=>setLoading(false))
        }
        getData();
    },[url])
  return {response,error,loading}
}

export default useAxios