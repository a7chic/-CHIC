import React from "react";


interface EmptyStateProps{

icon:string;

title:string;

description:string;

}



export default function EmptyState({
icon,
title,
description
}:EmptyStateProps){


return(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"40px",
textAlign:"center",
color:"#fff"
}}
>


<div
style={{
fontSize:"60px"
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



<p
style={{
color:"#aaa"
}}
>

{description}

</p>


</div>

);

}