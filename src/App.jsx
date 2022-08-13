import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import {Welcome} from './pages/Welcome'
 
const App = () => {
  const [name,setName] = useState('')



  useEffect(()=>{
    console.log(name)
    
  },[name])








  return (
    <>
      <div className="container">
        {/**logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            placeItems: "center",
            columnGap: "5px",
          }}
        >
          <img
            style={{
              height: "50px",
              borderRadius: "10px",
            }}
            src="img.jpg"
            alt=""
          />
          <h2>this logo</h2>
        </div>
        {/**login btn */}

        <button
          onClick={() =>  console.log(name)}
          style={{ width: "100px", height: "45px", borderRadius: "10px" }}
        >
          login
        </button>
        <input onChange={(e)=>  setName(e.target.value)}/>
      </div>
      {/**component */}
      <div
        style={{
          height: "500px",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ComponentA title="kongchee" age={10} address={"sfsdf"} />
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: '10px'
        }}>
        <Welcome src={`img.jpg`} alt={'img.jpg'}/>
        <Welcome src={`img.jpg`} alt={'img.jpg'}/>

        </div>
       
        
      </div>
    </>
  );
};

const ComponentA = (props) => {
  const { title, age, address } = props;

  return (
    <>
      <h1 style={{ backgroundColor: "gray" }}>Hello {address}</h1>
    </>
  );
};

export default App;
