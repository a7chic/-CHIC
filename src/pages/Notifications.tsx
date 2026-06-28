import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notifications(){

const navigate=useNavigate();

const [notifications,setNotifications]=useState<any[]>([]);

useEffect(()=>{

const data=JSON.parse(

localStorage.getItem("notifications")||"[]"

);

setNotifications(data);

},[]);

const clearNotifications=()=>{

localStorage.removeItem("notifications");

setNotifications([]);

};

return(

<div style={{color:"#fff"}}>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
flexWrap:"wrap",
gap:"15px"
}}
>

<div>

<h1
style={{
color:"#D4AF37",
margin:0
}}
>

🔔 الإشعارات

</h1>

<p
style={{
color:"#999"
}}
>

آخر التنبيهات الخاصة بحسابك

</p>

</div>

<button
onClick={clearNotifications}
style={{
background:"#D4AF37",
border:"none",
padding:"12px 18px",
borderRadius:"10px",
cursor:"pointer",
fontWeight:"bold"
}}
>

حذف الكل

</button>

</div>

{

notifications.length===0?

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
padding:"45px",
borderRadius:"18px",
textAlign:"center"
}}
>

<div style={{fontSize:"60px"}}>

🔕

</div>

<h2
style={{
color:"#D4AF37"
}}
>

لا توجد إشعارات

</h2>

</div>

:

notifications.map((item,index)=>(

<div
key={index}
style={{
background:"#111",
border:"1px solid #333",
padding:"20px",
borderRadius:"15px",
marginBottom:"15px",
cursor:"pointer"
}}
onClick={()=>navigate(item.link||"/home")}
>

<h3
style={{
margin:"0 0 10px",
color:"#D4AF37"
}}
>

{item.title}

</h3>

<p
style={{
margin:0,
color:"#ddd"
}}
>

{item.message}

</p>

</div>

))

}

</div>

);

}