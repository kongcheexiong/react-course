import axios from "axios";
// create instance for axios
const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 1000,
});
// fetch all data 
export const fetchDogs = async () => {
  const path = location.pathname.split("/");
  const text = 'ssdfssa-asdf/asdfsdf/asdfasdf/asdf'

  if (path[2]) {
    const { data } = await instance.get(`products/${path[2]}`);
    return data;
  }
  const rndInt = Math.floor(Math.random() * 6) + 1
  const { data } = await instance.get(`products/${rndInt}`);
  return data;

};
