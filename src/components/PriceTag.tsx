import React from "react";

interface Props{

price:string|number;

}

export default function PriceTag({

price

}:Props){

return(

<span
style={{
background:"#D4AF37",
color:"#000",
padding:"6px 12px",
borderRadius:"8px",
fontWeight:"bold",
fontSize:"15px"
}}
>

💰 {price} ريال

</span>

);

}