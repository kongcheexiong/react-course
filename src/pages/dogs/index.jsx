import React, { useEffect, useState } from "react";

import { useQuery } from "react-query";
import { fetchDogs } from "../../api";

export default function Dogs() {
  const { data, error, isError, isLoading, status } = useQuery("dogs", fetchDogs);





  useEffect(() => {
    console.log('data',data)

  }, [data]);
  return (
    <div>
      {isLoading ? (
        <div> Loading...</div>
      ) : isError ? (
        <div>{status}</div>
      ) : (
        <>
          <h2>Title: {data?.title}</h2>
          <img style={{
            height: '100px'
          }} src={data?.image} alt="" />
         
          
          
          
        </>
      )}
    </div>
  );
}
