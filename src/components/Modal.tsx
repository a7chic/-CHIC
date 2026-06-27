import React from "react";


interface ModalProps{

open:boolean;

title:string;

children:React.ReactNode;

onClose:()=>void;

}



export default function Modal({
open,
title,
children,
onClose
}:ModalProps){


if(!open) return null;



return(

<div
style={{
position:"fixed",
inset:0,
background:"rgba(0,0,0,0.7)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:999
}}
>


<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"30px",
width:"90%",
maxWidth:"500px",
color:"#fff"
}}
>


<h2
style={{
color:"#D4AF37"
}}
>

{title}

</h2>



{children}



<button
onClick={onClose}
style={{
marginTop:"20px",
background:"#D4AF37",
border:"none",
padding:"12px 25px",
borderRadius:"10px",
fontWeight:"bold"
}}
>

إغلاق

</button>


</div>


</div>

);

}