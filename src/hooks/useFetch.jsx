import { useState, useEffect } from "react"
import { fetchDataFromApi } from "../utils/api"


const useFetch=(url)=>{
  const[data,setData]=useState(null)
  const[loading, setLoading]=useState(false)
  const[error, setError]=useState(null)

  useEffect(()=>{
    const fetchData=async ()=>{
      setLoading(true)
      setData(null)
      setError(null)

      try {
        const response=await fetchDataFromApi(url);
        setLoading(true)
        setData(response)
      } catch (error) {
        setLoading(false);
        setError("Something went wrong");
      }
    }
    fetchData() 
  },[url])
  return {data,loading, error}
}

export default useFetch
