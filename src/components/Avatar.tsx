import React from "react";

interface Props{
name?:string;
image?:string;
size?:number;
}

export default function Avatar({
name="U",
image,
size=60
}:Props){

if(image){

return(

<img

src={image}

alt={name}

style={{
width:size,
height:size,
borderRadius:"50%",
objectFit:"cover",
border:"2px solid #D4AF37"
}}

/>

);

}

return(

<div
style={{
width:size,
height:size,
borderRadius:"50%",
background:"#D4AF37",
color:"#000",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontWeight:"bold",
fontSize:size/2.3
}}
>

{name.charAt(0).toUpperCase()}

</div>

);

}