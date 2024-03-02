
import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Navbar';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Getprice from './Getprice';
import {Link} from 'react-router-dom';
import Cloud from './Cloud';
const App = () => {

 
  const [theme,setTheme] = useState('light');

  return(
    <div>

 
    <div className={`container ${theme}`} >
         <Navbar theme={theme} setTheme={setTheme}/>
    
       
    </div>

    </div>

    
  )
}


export default App;