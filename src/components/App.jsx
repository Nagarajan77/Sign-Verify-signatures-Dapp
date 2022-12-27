
import '../css/App.css';
import Footer from './footer';
import Nav from './navbar';
import Sign, { sigg } from './sign_msg';
import Verify from './verify_msg';


function App() {

  const sig = sigg;
  
  return (
    <>
      <div className="App">
        <Nav />

        <div className='Appbody'>
            <Sign />
            <Verify />
        </div>



      </div>
      <Footer count = {sig.length}/>
    </>
  );
}

export default App