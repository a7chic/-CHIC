import React from "react";

type Props={

icon:string;

title:string;

count?:number;

};

export default function CategoryCard({

icon,

title,

count=0

}:Props){

return(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
textAlign:"center",
cursor:"pointer",
transition:"0.2s"
}}
>

<div
style={{
fontSize:"55px"
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

<p
style={{
color:"#888"
}}
>

{count} إعلان

</p>

</div>

);

}