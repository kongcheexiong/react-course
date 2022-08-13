import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'gray',
      padding: '5px 10px',
      borderRadius: '10px'

     
    }}>
      {/**logo */}
      <div style={{
         display: 'flex',
         flexDirection: 'row',
         placeItems:'center',
         columnGap:'5px'

      }}>
      <img style={{
        height: '50px',
        borderRadius: '10px'
      }} src="img.jpg" alt="" />
        <h2>this logo</h2>
    
      </div>
      {/**login btn */}
 
 
     <button onClick={()=>alert('Hi!!')} style={{width: '100px', borderRadius: '10px'}}>login</button>


       
        
   
      

     
    </div>
  );
}

export default App;
