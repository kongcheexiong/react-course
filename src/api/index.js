import axios from "axios";
import { server_url } from "../constants";
// create instance for axios
const instance = axios.create({
  baseURL: `${server_url}`,
  timeout: 1000,
  headers:{
    authorization: localStorage.getItem("token")
  }
});

export const fetchUsers = async () =>{
  const {data} = await instance.get(`all-user`)
  return data
}

// fetch all data 
export const fetchDogs = async () => {
  const path = location.pathname.split("/");

  if (path[2]) {
    const { data } = await instance.get(`products/${path[2]}`);
    return data;
  }
  const rndInt = Math.floor(Math.random() * 6) + 1
  const { data } = await instance.get(`products/${rndInt}`);
  return data;

};

// insert users 


// https://fakestoreapi.com/product/1

// get https://fakestoreapi.com/product/1
// put https://fakestoreapi.com/product/1
// delete https://fakestoreapi.com/product/1

// post localhost/api/adduser?userid='fsdf'&username='sdafas'
// patch