import React from "react";

interface Props{
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
}:Props){

if(!open) return null;

return(

<div
style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,.75)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:9999
}}
>

<div
style={{
width:"95%",
maxWidth:"550px",
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
color:"#fff"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
}}
>

<h2
style={{
margin:0,
color:"#D4AF37"
}}
>

{title}

</h2>

<button
onClick={onClose}
style={{
background:"transparent",
border:"none",
color:"#fff",
fontSize:"22px",
cursor:"pointer"
}}
>

✖

</button>

</div>

{children}

</div>

</div>

);

}