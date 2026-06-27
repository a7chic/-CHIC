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

<div
style={{
color:"#fff"
}}
>

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

عدد الإشعارات: {notifications.length}

</p>

</div>

<div
style={{
display:"flex",
gap:"10px"
}}
>

<button
onClick={()=>navigate("/haraj")}
style={{
background:"#D4AF37",
border:"none",
padding:"12px 18px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

🛒 الحراج

</button>

<button
onClick={clearNotifications}
style={{
background:"#333",
color:"#fff",
border:"1px solid #555",
padding:"12px 18px",
borderRadius:"10px",
cursor:"pointer"
}}
>

🗑️ مسح الكل

</button>

</div>

</div>

{

notifications.length===0?

(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"60px",
textAlign:"center"
}}
>

<div
style={{
fontSize:"65px"
}}
>

🔔

</div>

<h2
style={{
color:"#D4AF37"
}}
>

لا توجد إشعارات جديدة

</h2>

<p
style={{
color:"#999"
}}
>

ستظهر هنا إشعارات الرسائل والإعجابات والإعلانات الجديدة.

</p>

</div>

)

:

notifications.map((item,index)=>(

<div
key={index}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"15px",
padding:"18px",
marginBottom:"15px"
}}
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