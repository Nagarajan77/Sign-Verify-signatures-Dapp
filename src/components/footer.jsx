import React from 'react'
import {  FaGithubSquare, FaTwitterSquare } from 'react-icons/fa';

const Footer = (props) => {
  const x = props.count;
  console.log(x);
  return (
    // { x !== 0 ? 'footermove' : 'footer'}
    <div className= 'footermove' >
       <h2> 
          made by &nbsp;
          <a href="https://twitter.com/Nagarajan_jk" target="_blank" rel="noopener noreferrer">Nagarajan_jk  </a> 
          <a href="https://twitter.com/Nagarajan_jk" className='icon' target="_blank" rel="noopener noreferrer"><FaTwitterSquare /> </a>
          <a href="https://github.com/Nagarajan_jk/Sign-Verify-digital-signatures" className='icon' target="_blank" rel="noopener noreferrer"><FaGithubSquare /></a>
          &nbsp; &nbsp; inspired from &nbsp;
          <a href="https://www.youtube.com/c/ArturChmaro" target="_blank" rel="noopener noreferrer">ArturChmaro</a>
       </h2>
    </div>
  )
}

export default Footer