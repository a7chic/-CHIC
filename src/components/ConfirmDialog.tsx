import React from "react";


interface Props{

open:boolean;

message:string;

onConfirm:()=>void;

onCancel:()=>void;

}



export default function ConfirmDialog({
open,
message,
onConfirm,
onCancel
}:Props){


if(!open) return null;



return(

<div
style={{
position:"fixed",
inset:0,
background:"rgba(0,0,0,.7)",
display:"flex",
justifyContent:"center",
alignItems:"center",
zIndex:1000
}}
>


<div
style={{
background:"#111",
border:"1px solid #D4AF37",
padding:"30px",
borderRadius:"18px",
textAlign:"center",
color:"#fff"
}}
>


<h3>

{message}

</h3>


<button
onClick={onConfirm}
style={{
background:"#D4AF37",
border:"none",
padding:"10px 20px",
margin:"10px",
borderRadius:"10px"
}}
>

تأكيد

</button>


<button
onClick={onCancel}
style={{
background:"#333",
color:"#fff",
border:"none",
padding:"10px 20px",
borderRadius:"10px"
}}
>

إلغاء

</button>


</div>


</div>

);

}