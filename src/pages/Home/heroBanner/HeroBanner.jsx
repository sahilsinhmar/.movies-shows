/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react'
import "./style.scss"
import { useNavigate  } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'

//importing lazyloading and content wrapper
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


export const HeroBanner = () => {

  // extracting the base url from the home slice in our store
  const imageUrl=useSelector((store)=> store.home.url)
 
  //state for background image
  const [background,setBackground]=useState('')

  // state for search
  const[query,setQuery]=useState('')

  // instasnce of useNavigate()
  const navigate=useNavigate()

  //using custom fetch hook to get the upcoming movies list
  const{data,loading}=useFetch('/movie/upcoming')

  useEffect(()=>{
    const backgroundPath=imageUrl.backdrop + data?.results?.[Math.floor(Math.random()*20)].backdrop_path
    setBackground(backgroundPath)

  },[data])

  // using onKeyup when presssing enter sending the search query to search page url
   const searchQueryHandler=(e)=>{
      if(e.key==="Enter" && query.length>0){
        navigate(`/search/${query}`)
      }
    }


  return (
    <div className='heroBanner'>
      {loading && <div className="backdrop-img">
        <Img src={background}/>
      </div>}

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcom</span>
          <span className="subtitle">Millions of movies, TV shows and people
           to discover. 
           Explore now</span>
           <div className="searchInput">
            <input type='text' onKeyUp={searchQueryHandler} onChange={(e)=>setQuery(e.target.value)} placeholder='search for a movie or tv shows..'/>
            <button>Search</button>
           </div>
        </div>
      </ContentWrapper>
    </div>
  )
}
