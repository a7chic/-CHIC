import React from "react";


interface Props{

price:string;

}



export default function PriceTag({
price
}:Props){


return(

<div
style={{
display:"inline-block",
background:"#D4AF37",
color:"#000",
padding:"8px 18px",
borderRadius:"20px",
fontWeight:"bold"
}}
>

{price} ريال

</div>

);

}