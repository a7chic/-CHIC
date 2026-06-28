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
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import Chat from "./pages/Chat";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

export default function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Navigate to="/home" replace/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
element={
<ProtectedRoute>
<MainLayout/>
</ProtectedRoute>
}
>

<Route path="/home" element={<Home/>}/>
<Route path="/haraj" element={<Haraj/>}/>
<Route path="/catalog" element={<Catalog/>}/>
<Route path="/favorites" element={<Favorites/>}/>
<Route path="/notifications" element={<Notifications/>}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/search" element={<Search/>}/>
<Route path="/categories" element={<Categories/>}/>
<Route path="/product/:id" element={<ProductDetails/>}/>
<Route path="/add-product" element={<AddProduct/>}/>
<Route path="/chat/:id" element={<Chat/>}/>

<Route
path="/admin"
element={
<ProtectedAdminRoute>
<AdminDashboard/>
</ProtectedAdminRoute>
}
/>

</Route>

<Route
path="*"
element={<Navigate to="/home" replace/>}
/>

</Routes>

</BrowserRouter>

);

}