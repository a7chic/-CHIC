import React from "react";


interface ProductCardProps{

title:string;

price:string;

image?:string;

category?:string;

}



export default function ProductCard({
title,
price,
image,
category
}:ProductCardProps){


return(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
overflow:"hidden",
color:"#fff"
}}
>


{image &&

<img
src={image}
alt={title}
style={{
width:"100%",
height:"220px",
objectFit:"cover"
}}
/>

}



<div
style={{
padding:"20px"
}}
>


<h2
style={{
color:"#D4AF37"
}}
>

{title}

</h2>



<p>

{category}

</p>



<h3>

{price} ريال

</h3>


<button
style={{
background:"#D4AF37",
border:"none",
padding:"10px 20px",
borderRadius:"10px",
fontWeight:"bold"
}}
>

عرض التفاصيل

</button>


</div>


</div>

);

}