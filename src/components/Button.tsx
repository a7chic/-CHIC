import React from "react";

interface ButtonProps{
text:string;
onClick?:()=>void;
type?:"button"|"submit";
disabled?:boolean;
loading?:boolean;
icon?:React.ReactNode;
}

export default function Button({
text,
onClick,
type="button",
disabled=false,
loading=false,
icon
}:ButtonProps){

return(

<button
type={type}
onClick={onClick}
disabled={disabled||loading}
style={{
background:disabled?"#777":"#D4AF37",
color:"#000",
border:"none",
padding:"14px 28px",
borderRadius:"12px",
fontWeight:"bold",
cursor:disabled?"not-allowed":"pointer",
width:"100%",
fontSize:"16px",
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"10px",
transition:"0.25s",
opacity:loading?0.8:1
}}
>

{loading?"⏳":icon}

{loading?"جاري التنفيذ...":text}

</button>

);

}