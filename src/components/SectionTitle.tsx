import React from "react";


interface Props{

title:string;

icon?:string;

}



export default function SectionTitle({
title,
icon
}:Props){


return(

<h2
style={{
color:"#D4AF37",
display:"flex",
alignItems:"center",
gap:"10px",
marginBottom:"20px"
}}
>

{icon}

{title}

</h2>

);

}