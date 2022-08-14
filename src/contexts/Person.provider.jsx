import {createContext, useState} from 'react'

export const personContext = createContext();

export const PersonProvider = (props) => {
  const { children } = props;
  const [person, setPerson] = useState();
  return (
    <personContext.Provider value={{ person, setPerson }}>
      {children}
    </personContext.Provider>
  );
};