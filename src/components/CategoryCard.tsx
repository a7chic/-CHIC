import React from "react";


interface CategoryProps{

icon:string;

title:string;

}



export default function CategoryCard({
icon,
title
}:CategoryProps){


return(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
textAlign:"center",
color:"#fff"
}}
>


<div
style={{
fontSize:"45px"
}}
>

{icon}

</div>



<h3
style={{
color:"#D4AF37"
}}
>

{title}

</h3>


</div>

);

}