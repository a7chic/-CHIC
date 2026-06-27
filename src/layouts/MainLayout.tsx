import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const menu = [
  { title: "الرئيسية", path: "/home", icon: "🏠" },
  { title: "الحراج", path: "/haraj", icon: "🛒" },
  { title: "الكتالوج", path: "/catalog", icon: "👗" },
  { title: "المفضلة", path: "/favorites", icon: "❤️" },
  { title: "الإشعارات", path: "/notifications", icon: "🔔" },
  { title: "حسابي", path: "/profile", icon: "👤" },
];

export default function MainLayout() {

const location = useLocation();

return (

<div
style={{
background:"#050505",
color:"#fff",
minHeight:"100vh",
display:"flex",
flexDirection:"column"
}}
>

<header
style={{
height:"70px",
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"0 20px",
background:"#111",
borderBottom:"2px solid #D4AF37"
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


<div>

🔔 👤

</div>


</header>


<div
style={{
background:"#D4AF37",
color:"#000",
padding:"10px",
fontWeight:"bold",
textAlign:"center"
}}
>

🎉 أهلاً بك في منصة أناقة CHIC الملكية

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


{menu.map((item)=>(

<Link
key={item.path}
to={item.path}
style={{
display:"block",
padding:"14px",
marginBottom:"12px",
borderRadius:"12px",
textDecoration:"none",
background:
location.pathname===item.path
? "#D4AF37"
: "#1d1d1d",
color:
location.pathname===item.path
? "#000"
: "#fff",
fontWeight:"bold"
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
overflowY:"auto",
background:"#050505"
}}
>


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginBottom:"25px"
}}
>


{[
["👥","المستخدمون","0"],
["🛒","الإعلانات","0"],
["👑","المشرفون","0"],
["💬","التعليقات","0"]
].map((item)=>(


<div
key={item[1]}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px"
}}
>


<div
style={{
fontSize:"40px"
}}
>

{item[0]}

</div>


<h2
style={{
marginTop:"10px"
}}
>

{item[1]}

</h2>


<h1
style={{
color:"#D4AF37",
marginTop:"10px"
}}
>

{item[2]}

</h1>


</div>


))}


</div>



<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"20px",
minHeight:"500px"
}}
>


<Outlet/>


</div>


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