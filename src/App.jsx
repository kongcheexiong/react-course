import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
 const [count, setCount] = useState()

 //count = 0 
 // setCount(10)
 // count = 10

  return (
    <div style={{
      fontSize: '30px',
      display: 'flex',
      flexDirection: 'column'
    }} >
      <input type="text" onChange={(e)=>setCount('sdfdf')} />
      this is hello from git asdf
      {count}
      
      
    </div>
  )
}

export default App
