import React from 'react'
import { Route, useNavigate, Navigate } from 'react-router-dom'
import { router } from '../constants';
export default function ProtectedRoute(props) {
  const { children} = props 
  const token = localStorage.getItem("token")
  console.log(name)
  if(!token){
    return <Navigate to= "/"/>
  }
  return children
}
