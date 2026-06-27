import React from "react";
import {
BrowserRouter,
Routes,
Route,
Navigate
} from "react-router-dom";


import MainLayout from "./layouts/MainLayout";


import Home from "./pages/Home";
import Haraj from "./pages/Haraj";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";



export default function App(){


return(

<BrowserRouter>

<Routes>


<Route
path="/"
element={
<Navigate to="/login"/>
}
/>



<Route
path="/login"
element={
<Login/>
}
/>



<Route
path="/register"
element={
<Register/>
}
/>



<Route
element={
<MainLayout/>
}
>


<Route
path="/home"
element={
<Home/>
}
/>


<Route
path="/haraj"
element={
<Haraj/>
}
/>


<Route
path="/catalog"
element={
<Catalog/>
}
/>


<Route
path="/favorites"
element={
<Favorites/>
}
/>


<Route
path="/notifications"
element={
<Notifications/>
}
/>


<Route
path="/profile"
element={
<Profile/>
}
/>


</Route>


</Routes>

</BrowserRouter>

);

}