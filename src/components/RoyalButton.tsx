import React from "react";

interface Props{

title:string;

onClick?:()=>void;

}

export default function RoyalButton({title,onClick}:Props){

return(

<button

onClick={onClick}

style={{

width:"100%",

padding:"15px",

border:"none",

borderRadius:"12px",

background:"linear-gradient(135deg,#d4af37,#9b7a20)",

color:"#000",

fontWeight:"bold",

fontSize:"17px"

}}

>

{title}

</button>

);

}