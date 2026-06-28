import React from "react";

interface Props{
open:boolean;
title:string;
message:string;
onConfirm:()=>void;
onCancel:()=>void;
}

export default function ConfirmDialog({
open,
title,
message,
onConfirm,
onCancel
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
background:"rgba(0,0,0,.7)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:9999
}}
>

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
width:"90%",
maxWidth:"420px",
color:"#fff"
}}
>

<h2
style={{
marginTop:0,
color:"#D4AF37"
}}
>

{title}

</h2>

<p
style={{
color:"#ccc",
lineHeight:"28px"
}}
>

{message}

</p>

<div
style={{
display:"flex",
gap:"10px",
marginTop:"25px"
}}
>

<button
onClick={onConfirm}
style={{
flex:1,
background:"#D4AF37",
color:"#000",
border:"none",
padding:"12px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

تأكيد

</button>

<button
onClick={onCancel}
style={{
flex:1,
background:"#333",
color:"#fff",
border:"none",
padding:"12px",
borderRadius:"10px",
cursor:"pointer"
}}
>

إلغاء

</button>

</div>

</div>

</div>

);

}