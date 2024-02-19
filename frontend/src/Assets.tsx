import React from 'react'

const Assets = () => {

    const getAssets = async ()=>{
        const response = await fetch("http://localhost:8000/api/assets")
        const data = await response.json();

        console.log(data);
    }

  return (
    <button onClick={getAssets}>Get Assets Report</button>
  )
}

export default Assets