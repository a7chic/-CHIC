import React from "react";

interface Props{
text:string;
color?:string;
background?:string;
}

export default function Badge({
text,
color="#000",
background="#D4AF37"
}:Props){

return(

<span
style={{
display:"inline-block",
padding:"6px 12px",
borderRadius:"999px",
background,
color,
fontWeight:"bold",
fontSize:"13px"
}}
>

{text}

</span>

);

}