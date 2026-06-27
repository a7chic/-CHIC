import React from "react";


interface CardProps{

title:string;

icon?:string;

children?:React.ReactNode;

}



export default function Card({
title,
icon,
children
}:CardProps){


return(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
color:"#fff"
}}
>


<div
style={{
fontSize:"40px"
}}
>

{icon}

</div>



<h2
style={{
color:"#D4AF37"
}}
>

{title}

</h2>



{children}


</div>

);

}