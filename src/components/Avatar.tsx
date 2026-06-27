import React from "react";


interface Props{

image?:string;

name?:string;

}



export default function Avatar({
image,
name
}:Props){


return(

<div
style={{
display:"flex",
alignItems:"center",
gap:"12px"
}}
>


{image ? (

<img
src={image}
alt={name}
style={{
width:"55px",
height:"55px",
borderRadius:"50%",
objectFit:"cover",
border:"2px solid #D4AF37"
}}
/>

):(


<div
style={{
width:"55px",
height:"55px",
borderRadius:"50%",
background:"#D4AF37",
color:"#000",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontWeight:"bold",
fontSize:"22px"
}}
>

👤

</div>

)}



<span
style={{
color:"#fff",
fontWeight:"bold"
}}
>

{name || "مستخدم"}

</span>


</div>

);

}