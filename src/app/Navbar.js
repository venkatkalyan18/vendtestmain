import React from 'react';
import { useState } from "react";
import './App.css'
import {Link} from 'react-router-dom'
import Image from 'next/image'
import Azuki from './money-icons-bank.svg'

const Navbar = ({theme, setTheme}) => {

    function changeTheme(){
        theme == 'light' ? setTheme('dark') : setTheme('light');
    }

    return(
        <div className='main-div'>
            
        
        <nav className='nav-bar'>
            <Link to='/'className='logo'> Vend-O-print</Link>
            <ul>
                <li>Home</li>
                <li>Services</li>
                <li>About Us</li>
                <li>Contact</li>
            </ul>
            
        <img src='favicon.ico' alt="Photo" className='toggle-img' onClick={changeTheme}/>
            
            
        </nav>
        <div className='main--div'>
            <div className='maincontent-div'>
                <h2 > Welcome to Vendo-O-print,</h2>
                <p>your ultimate printing partner on campus. Whether you're working on a class project, promoting an event, or simply need to print your resume, we've got everything you need to make a statement.</p>
                <Link to='/getprice' className='print-btn'>Getprice</Link>
                <Link to='/upload' className='print-btn'>Upload</Link>
            </div>
            <div className='vend-div'>
       
        <Image
      src={Azuki}
      alt="Picture of the author"
      className='vend-logo'
    />
    </div>
        </div>
      
        </div>
    )   
}

export default Navbar;