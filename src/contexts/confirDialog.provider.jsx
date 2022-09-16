import {createContext, useState} from 'react'

export const ConfirmContext = createContext(); /// create context for employee

export const ConfirmProvider = (props) => { //// create provider for employee
  const { children } = props;
  const [confirmPopUp, setConfirmPopUp] = useState(false);/// creat state for employee
  return (
    <ConfirmContext.Provider value={{ confirmPopUp, setConfirmPopUp }}>
      {children}
    </ConfirmContext.Provider>
  );
};
