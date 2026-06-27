import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

const menu=[
{title:"الرئيسية",path:"/home",icon:"🏠"},
{title:"الحراج",path:"/haraj",icon:"🛒"},
{title:"الكتالوج",path:"/catalog",icon:"👗"},
{title:"المفضلة",path:"/favorites",icon:"❤️"},
{title:"الإشعارات",path:"/notifications",icon:"🔔"},
{title:"إضافة إعلان",path:"/add-product",icon:"➕"},
{title:"حسابي",path:"/profile",icon:"👤"}
];

export default function MainLayout(){

const location=useLocation();

const navigate=useNavigate();

const logout=async()=>{

await logoutUser();

navigate("/login");

};

return(

<div
style={{
background:"#050505",
minHeight:"100vh",
display:"flex",
flexDirection:"column",
color:"#fff"
}}
>

<header
style={{
height:"70px",
background:"#111",
borderBottom:"2px solid #D4AF37",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"0 25px"
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

<div
style={{
display:"flex",
gap:"10px"
}}
>

<button
onClick={()=>navigate("/notifications")}
style={{
background:"#222",
color:"#fff",
border:"1px solid #444",
padding:"10px 14px",
borderRadius:"10px",
cursor:"pointer"
}}
>

🔔

</button>

<button
onClick={()=>navigate("/profile")}
style={{
background:"#222",
color:"#fff",
border:"1px solid #444",
padding:"10px 14px",
borderRadius:"10px",
cursor:"pointer"
}}
>

👤

</button>

<button
onClick={logout}
style={{
background:"#D4AF37",
color:"#000",
border:"none",
padding:"10px 18px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

خروج

</button>

</div>

</header>

<div
style={{
background:"#D4AF37",
color:"#000",
padding:"12px",
fontWeight:"bold",
textAlign:"center"
}}
>

✨ مرحباً بك في منصة ANAQA CHIC الفاخرة ✨

</div>

<div
style={{
display:"flex",
flex:1
}}
>

<aside
style={{
width:"250px",
background:"#111",
padding:"20px",
borderLeft:"1px solid #333"
}}
>

{menu.map(item=>(

<Link
key={item.path}
to={item.path}
style={{
display:"block",
padding:"14px",
marginBottom:"12px",
borderRadius:"12px",
textDecoration:"none",
fontWeight:"bold",
background:
location.pathname===item.path
?"#D4AF37"
:"#1d1d1d",
color:
location.pathname===item.path
?"#000"
:"#fff"
}}
>

{item.icon} {item.title}

</Link>

))}

</aside>

<main
style={{
flex:1,
padding:"25px",
overflowY:"auto"
}}
>

<Outlet/>

</main>

</div>

<footer
style={{
height:"60px",
background:"#111",
borderTop:"2px solid #D4AF37",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontWeight:"bold",
color:"#D4AF37"
}}
>

© 2026 ANAQA CHIC

</footer>

</div>

);

}