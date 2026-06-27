import React from "react";


interface Props{

text:string;

}



export default function Badge({
text
}:Props){


return(

<span
style={{
background:"#D4AF37",
color:"#000",
padding:"6px 12px",
borderRadius:"15px",
fontSize:"13px",
fontWeight:"bold"
}}
>

{text}

</span>

);

}