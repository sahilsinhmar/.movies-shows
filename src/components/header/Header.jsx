/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import {HiOutlineSearch} from "react-icons/hi"
import {SlMenu} from "react-icons/sl"
import {VscChromeClose} from "react-icons/vsc"
import { useNavigate, useLocation } from 'react-router-dom'
import "./style.scss"

import ContentWrapper from '../contentWrapper/ContentWrapper'
import logo from "../../assets/movix-logo.svg"

const Header = () => {
  const[query,setQuery]=useState('')
  const[showSearch, setShowSearch]=useState(false)
  const [mobileMenu, setMobileMenu]=useState(false)
  const [lastScrollY,setLastScrollY]=useState(0)
  const [show, setShow]=useState("top")

  const navigate=useNavigate()
  const location=useLocation();

  //start any page at top when navigate
  useEffect(()=>{
    window.scrollTo(0,0)

  },[location])

  //to open the search box
  const openSearch=()=>{
    setMobileMenu(false)
    showSearch ? setShowSearch(false) : setShowSearch(true)
  }

  //handler for opening mobile menu
  const openMobileMenu=()=>{
    setMobileMenu(true)
    setShowSearch(false)
  }

  // using onKeyup when presssing enter sending the search query to search page url
  const searchQueryHandler=(e)=>{
    if(e.key==="Enter" && query.length>0){
      navigate(`/search/${query}`)
      setTimeout(()=>{
        setShowSearch(false)
      },1000)
    }
  }

  //Navigation Handler - to got movies and shows page
  const navigationHandler=(type)=>{
    if(type=== "movies"){
      navigate("/explore/movie")
    }else{
      navigate("/explore/tv")
    }
    setMobileMenu(false)
  }

  // Handling the state of Navbar 
  const handleNavbar=()=>{
    console.log(window.scrollY)
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide")
      }else{
        setShow("show")
      }
    }else{
      setShow('top')
    }
    setLastScrollY(window.scrollY)
  }

  // 
  useEffect(()=>{
    window.addEventListener("scroll",handleNavbar);
    return ()=>{
      window.removeEventListener("scroll", handleNavbar)
    }
  },[lastScrollY])


  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=>{navigate("/")
      setMobileMenu(false)}}>
          <img src={logo} alt=''/>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler("movies")}  >Movies</li>
          <li className="menuItem" onClick={()=>navigationHandler("shows")} >Shows</li>
          <li className="menuItem"  onClick={openSearch}><HiOutlineSearch/></li>
        </ul>

        <div className='mobileMenuItems'>
          <HiOutlineSearch className='searchMobileButton' onClick={openSearch}/>
          {mobileMenu ? (
            <VscChromeClose onClick={()=>setMobileMenu(false)} /> 
          ): (<SlMenu onClick={openMobileMenu} />)}
        </div>
      </ContentWrapper>


      {showSearch && ( <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input type='text' onKeyUp={searchQueryHandler} onChange={(e)=>setQuery(e.target.value)} placeholder='search for a movie or tv shows..'/>
            <VscChromeClose onClick={()=>setShowSearch(false)}/>
           </div>
        </ContentWrapper>
      </div>)     
     }
    </header>
  )
}


export default Header