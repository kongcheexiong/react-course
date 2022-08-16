import {createContext, useState} from 'react'

export const employeeContext = createContext(); /// create context for employee

export const EmployeeProvider = (props) => { //// create provider for employee
  const { children } = props;
  const [employee, setEmployee] = useState({
    name: '',
    surname: '',
    age: ''
  });/// creat state for employee
  return (
    <employeeContext.Provider value={{ employee, setEmployee }}>
      {children}
    </employeeContext.Provider>
  );
};
