import { ethers } from 'ethers'
import React,{  useState } from 'react'

const verify_call = async ({seterror,message,signature,address}) => {
  try {
    const getsigner =  ethers.utils.verifyMessage(message,signature)
    console.log(getsigner);
    return (address !== getsigner ? false : true) ;
  } catch(error) {
    console.log(error);
    seterror(error.message.slice(0,17))
    return false;
  }
}


const Verify = () => {

  const [error, seterror] = useState();
  const [success, setsuccess] = useState();

 

  const verifymsg = async (e) => {
      e.preventDefault();
      const data = new FormData(e.target)
      seterror()
      
      const isvalid = await verify_call({
        seterror,
        message : data.get('message'),
        signature : data.get('signature'),
        address : data.get('address')
      })
      
      console.log('isvalid',isvalid)
      console.log('success',success);

       let addr = data.get('address')
       addr.length !== 42 && seterror('signer address (length)')
       setsuccess( isvalid ? '✅ VALID ✅' : '❌ INVALID ❌')
       return isvalid; 
  }

  return (
    <div className='verifycomp'>

      <div className='formverifycomp'>
        <div className='compheaderdiv'>
        <span className='compheader'>Verify Signature</span>
        </div>
          <form onSubmit={verifymsg}>
              <textarea id='r'  cols="70" rows="3" placeholder='message' name='message'></textarea>
              <textarea id='r' cols="70" rows="1" placeholder="signer's address" name='address'></textarea>
              <textarea id='r' cols="70" rows="4" placeholder='signature' name='signature'></textarea>
              <button id='r' type="submit" className='button'>Verify Signature</button>
          </form>
 
      </div>
      {( error || success) && (
           <div className={error ? 'error' : ( (success === '✅ VALID ✅') ?  'sucresult' : 'failresult')}>
           <h3>  
               {  error ? error && (`${error}, invalid input`) : ( success && success)}
           </h3>
         </div>
      )}
     
      
    </div>
  )
}

export default Verify