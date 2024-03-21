import React, { useState } from 'react'
import Logo from '../assets/TwitterLogo.png'
import { IoMdHome } from "react-icons/io";
import { Link } from 'react-router-dom';

function NavLinks({name , Logo}) {


  return (
    <div>
      <div className='flex items-center justify-center gap-4  hover:bg-gray-300 p-1.5 ease-in duration-300  hover:rounded-2xl'>
          {
             name === "Profile" ?  <Link to={`/${name}`}>{name}</Link> : name === "Home" ?  <Link to={`/`}>{name}</Link>  :  <Link to={`/${name}`}>{name}</Link>
          }
         </div>
    </div>
  )
}

export default NavLinks
