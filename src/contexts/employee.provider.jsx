import {createContext, useState} from 'react'

export const employeeContext = createContext(); ///

export const EmployeeProvider = (props) => { ////
  const { children } = props;
  const [employee, setEmployee] = useState();///
  return (
    <employeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </employeeContext.Provider>
  );
};