import React, { useState } from 'react'

const Form : React.FC<{ setLinkToken: React.Dispatch<React.SetStateAction<string>> }> = ({ setLinkToken }) => {

    const [email, setEmail] = useState("")
    const submit = async ()=>{
      const path = "http://localhost:8000/api/create_link_token";
      const response = await fetch(path, {
        method: "POST",
      });
      if (!response.ok) {
        console.log("backend error an error occured ---> line no 17", response.status)
        return;
      }
      const data = await response.json();
      if (data) {
        if (data.error != null) {
          console.log("data is not good ---> line no 23", data.error)
          return;
        }
        console.log("link_token data is : ", data);
      }
      setLinkToken(data.link_token)
    }

  return (
    <>
    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
    <br/>
    <input type="button" value={"Submit"} onClick={submit}/>
    </>
  )
}

export default Form