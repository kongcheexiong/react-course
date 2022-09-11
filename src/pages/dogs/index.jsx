import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { fetchDogs } from "../../api";
import { font } from "../../constants";

export default function Dogs() {
  const { data, error, isError, isLoading, status } = useQuery("dogs", fetchDogs);
 

  const [user,setUser] = useState('asdf') /////
  const [number, setNumber] = useState(1)
  //var user = 'asdf'


  useEffect(() => {
    console.log('data',data)
    //user = 'tong'
    setUser('tong') //user = 'tong'
    setNumber(10)
    

  }, [data]);
  return (
    <div>
      {isLoading ? (
        <div> Loading...</div>
      ) : isError ? (
        <div>{status}</div>
      ) : (
        <>
          <h2 style={{
            fontFamily: font.EN
          }}>Title: {data?.title}</h2>
          <img style={{
            height: '100px'
          }} src={data?.image} alt="" />
          <>{user} {number}</>
        
         
          
          
          
        </>
      )}
    </div>
  );
}
