/* eslint-disable no-unused-vars */
//importing pages
import { Home } from "./pages/Home/Home"
import { Details } from "./pages/details/Details"
import { PageNotFound } from "./pages/404/PageNotFound"
import { Explore } from "./pages/explore/Explore"
import { SearchResults } from "./pages/searchResult/SearchResults"
import Header from "./components/header/Header"


import {useState,useEffect} from "react"
import { fetchDataFromApi } from "./utils/api"
import { useDispatch,useSelector } from "react-redux"
import { BrowserRouter,Route,Routes } from "react-router-dom"
import { getApiConfiguration,getGenres } from "./store/homeSlice"
import Footer from "./components/footer/Footer"
import useFetch from "./hooks/useFetch"

function App() {
  const dispatch=useDispatch()
  const  url=useSelector(store=>store.home.url)

  const [movies, setMovies]=useState([])

  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function fetchApiConfig(){
    try {
      const response=await fetchDataFromApi('/configuration')
        const url={
          backdrop:response.images.secure_base_url + "original",
          poster:response.images.secure_base_url + "original",
          profile:response.images.secure_base_url + "original",
        }
        dispatch(getApiConfiguration(url))
    } catch (error) {
      console.log(error)
    }
  }

  const genresCall=async()=>{
    const genrestoring=[]
    const endpoints=["movie","tv"]
    const allGenres={}

      endpoints.forEach((url)=>{
        genrestoring.push(fetchDataFromApi(`/genre/${url}/list`))
      })
      const data= await Promise.all(genrestoring)
      data.map(({genres})=>{
        return genres.map((item)=>(allGenres[item.id]=item))
      
  })
  dispatch(getGenres(allGenres))
}
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/:mediaType/:id" element={<Details/>}/>
    <Route path="/explore/:mediaType" element={<Explore/>}/>
    <Route path="/search/:query" element={<SearchResults/>}/>
    <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}
export default App
