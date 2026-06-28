import React from "react";

interface Props{
children:React.ReactNode;
padding?:number;
}

export default function Card({
children,
padding=20
}:Props){

return(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding,
boxShadow:"0 8px 20px rgba(0,0,0,.25)"
}}
>

{children}

</div>

);

}