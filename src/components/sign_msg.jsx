import { ethers } from 'ethers'
import React from 'react'
import { useState } from 'react'
import { FaCopy } from 'react-icons/fa'

const signMessage = async ({seterror,message}) =>{
    !window.ethereum && alert("no ethereum wallet detected. Reccomended to install metamask browser extension")

    try {

      await window.ethereum.request({method : "eth_requestAccounts"})
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const addrress = await signer.getAddress(signer)
      const sig = await signer.signMessage(message)
      
      return {message,addrress,sig};

    } catch(error) {
      seterror(error.message?.slice(0,21))
      console.log(error);
    }

}
const sigg = []
const Sign = (props) => {

  const [error, seterror] = useState(undefined);
  const [sig, setsig] = useState([]);

  const newsignmsg = async (e) =>{

    try {
      e.preventDefault();
    const data = new FormData(e.target)
    seterror();

    const sigdata = await signMessage({seterror,message : data.get("message")})
    if(sigdata) {
      setsig([...sig , sigdata]) ;
      sigg.push(sigdata);
     }

    } catch(error) {
      console.log(error);
    }
    
  }

  return (
    <div className='signcomp'>
      <div className='compheaderdiv'>
      <span className='compheader'>Sign a message</span>
      </div>
      <div className='formsigncomp'>
          <form onSubmit={newsignmsg}>
            <textarea cols="70" rows="3" type='text'  name='message' placeholder='message' >

            </textarea>

            <button type="submit" className='button'>
                Sign Message
            </button>
          </form>
          {error && (
              <div className='error' >
              <h3 >{ error}</h3>
              </div>
          )}
          
      </div>
      
      {sig.length > 0 &&  <div className='prevsigns'>
        <span className='prevsigheader'>Prev signatures</span>
        {sig?.map( (sigdata,i) => {
           return (
            <div className='eachsign' key={i}>
                <h2 key={sigdata.messagei}>message&nbsp;: <textarea  cols="45" rows="2" className='msgtextarea' readOnly value={sigdata.message}></textarea> 
                  <button onClick={() => {navigator.clipboard.writeText(sigdata.message)}} className='copybutton'><FaCopy /></button>
                </h2>
                <h2 key={sigdata.addrress}>signer  &nbsp;: <span className='address'>{sigdata.addrress}</span>
                 <button onClick={() => {navigator.clipboard.writeText(sigdata.addrress)}} className='copybutton'><FaCopy /></button>
                </h2>
                <h2 key={sigdata.sig}>
                  signature : <textarea  id="i" cols="42" rows="3" readOnly value={sigdata.sig}></textarea>
                  <button onClick={() => {navigator.clipboard.writeText(sigdata.sig)}} className='copybutton'><FaCopy /></button>
                </h2>
            </div>)
        })}
          
      </div>}
    </div>
    
  )
}

export default Sign
export {sigg} ; 