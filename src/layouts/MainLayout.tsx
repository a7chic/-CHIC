import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { logoutUser } from "../services/authService";
import Footer from "../components/Footer";

export default function MainLayout(){

const navigate = useNavigate();


const logout = async()=>{

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
color:"#fff",
direction:"rtl"
}}
>


<header

style={{
background:"linear-gradient(145deg,#111,#050505)",
borderBottom:"2px solid #D4AF37",
padding:"18px 20px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:"15px",
boxShadow:"0 5px 25px rgba(212,175,55,.15)"
}}

>


<h2

style={{
margin:0,
color:"#D4AF37",
fontSize:"26px"
}}

>

👑 ANAQA CHIC

</h2>



<nav

style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
justifyContent:"center"
}}

>


{

menu.map(item=>

<NavLink

key={item[1]}

to={item[1]}

style={({isActive})=>({

padding:"10px 14px",

borderRadius:"12px",

textDecoration:"none",

background:isActive
?
"#D4AF37"
:
"transparent",

color:isActive
?
"#000"
:
"#fff",

fontWeight:"bold",

border:"1px solid #333"

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

padding:"12px 20px",

borderRadius:"12px",

fontWeight:"bold",

cursor:"pointer"

}}

>

تسجيل الخروج

</button>



</header>




<main

style={{

padding:"20px",

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