import Link from './Link'
import './App.css'
import { useEffect, useState } from 'react';
import Form from './Form';
import Assets from './Assets';


function App() {

  const [linkToken, setLinkToken] = useState<string>("");

  return (
    <div className='App'>
    {
      linkToken ? <>
        <Link linkToken={linkToken}/>
        <button onClick={()=>setLinkToken("")}>logout</button>
        <br/><br/>
        <Assets/>
      </> 
      : <Form setLinkToken={setLinkToken}/>

    }
    </div>
  )
}

export default App
