import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const App = ()=> {
  return (
    <>
     <div className="container">
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
 
 
     <button onClick={()=>alert('Hi!!')} style={{width: '100px' , height: '45px', borderRadius: '10px'}}>login</button>

     
    </div>
    {/**component */}
    <div style={{
      height: '500px',
  
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
      
    }}>
      <ComponentA title = 'kongchee' age= {10} address = {'sfsdf'}/>
      <ComponentA title = 'chia'  age= {10}/>
      <ComponentA title = 'bounma'/>
      <ComponentA title = 'chue' />
      

    </div>
    
   
    </>
   
  );
}

const ComponentA = (props)=>{
  const {title, age,address} = props

  return <>
  <h1 style={{backgroundColor: 'gray'}}>Hello {address}
 </h1>

  </>

}

export default App;
