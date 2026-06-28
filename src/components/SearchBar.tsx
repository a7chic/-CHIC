import React from "react";

type Props={

value:string;

onChange:(value:string)=>void;

placeholder?:string;

};

export default function SearchBar({

value,

onChange,

placeholder="ابحث عن منتج..."

}:Props){

return(

<input

value={value}

onChange={(e)=>onChange(e.target.value)}

placeholder={placeholder}

style={{

width:"100%",

padding:"15px",

borderRadius:"12px",

background:"#111",

border:"1px solid #D4AF37",

color:"#fff",

fontSize:"16px",

outline:"none",

boxSizing:"border-box"

}}

/>

);

}