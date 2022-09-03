import axios from "axios";
// create instance for axios
const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 1000,
});
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

// https://fakestoreapi.com/product/1

// get https://fakestoreapi.com/product/1
// put https://fakestoreapi.com/product/1
// delete https://fakestoreapi.com/product/1

// post localhost/api/adduser?userid='fsdf'&username='sdafas'
// patch