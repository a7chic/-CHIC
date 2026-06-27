import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/Login";

import Home from "./pages/Home";

import Admin from "./pages/Admin";

export default function Router(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>

<Route path="/home" element={<Home/>}/>

<Route path="/admin" element={<Admin/>}/>

</Routes>

</BrowserRouter>

);

}