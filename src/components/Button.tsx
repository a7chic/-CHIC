import React from "react";


interface ButtonProps{

text:string;

onClick?:()=>void;

type?: "button" | "submit";

}



export default function Button({
text,
onClick,
type="button"
}:ButtonProps){


return(

<button
type={type}
onClick={onClick}
style={{
background:"#D4AF37",
color:"#000",
border:"none",
padding:"14px 28px",
borderRadius:"12px",
fontWeight:"bold",
cursor:"pointer",
width:"100%"
}}
>

{text}

</button>

);

}