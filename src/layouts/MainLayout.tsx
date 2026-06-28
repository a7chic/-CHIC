import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";
import Footer from "../components/Footer";

export default function MainLayout(){

const navigate=useNavigate();

const logout=async()=>{

await logoutUser();

navigate("/login");

};

const menu=[

["🏠","/home","الرئيسية"],

["🛒","/haraj","الحراج"],

["👗","/catalog","الكتالوج"],

["❤️","/favorites","المفضلة"],

["🔔","/notifications","الإشعارات"],

["👤","/profile","حسابي"]

];

return(

<div
style={{
background:"#050505",
minHeight:"100vh",
color:"#fff"
}}
>

<header
style={{
background:"#111",
borderBottom:"2px solid #D4AF37",
padding:"18px 35px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:"15px"
}}
>

<h2
style={{
margin:0,
color:"#D4AF37"
}}
>

👑 ANAQA CHIC

</h2>

<nav
style={{
display:"flex",
gap:"12px",
flexWrap:"wrap"
}}
>

{

menu.map(item=>

<NavLink

key={String(item[1])}

to={String(item[1])}

style={({isActive})=>({

padding:"10px 15px",

borderRadius:"10px",

textDecoration:"none",

background:isActive?"#D4AF37":"transparent",

color:isActive?"#000":"#fff",

fontWeight:"bold"

})}

>

{item[0]} {item[2]}

</NavLink>

)

}

</nav>

<button
onClick={logout}
style={{
background:"#D4AF37",
border:"none",
padding:"10px 18px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

تسجيل الخروج

</button>

</header>

<main
style={{
padding:"25px",
maxWidth:"1450px",
margin:"0 auto"
}}
>

<Outlet/>

</main>

<Footer/>

</div>

);

}