import React from "react";

interface Props{

title:string;

subtitle?:string;

}

export default function SectionTitle({

title,

subtitle

}:Props){

return(

<div
style={{
marginBottom:"25px"
}}
>

<h2
style={{
margin:0,
color:"#D4AF37"
}}
>

{title}

</h2>

{

subtitle&&

<p
style={{
marginTop:"8px",
color:"#999"
}}
>

{subtitle}

</p>

}

</div>

);

}