import React from "react";


interface SearchBarProps{

value:string;

onChange:(value:string)=>void;

}



export default function SearchBar({
value,
onChange
}:SearchBarProps){


return(

<input
value={value}
onChange={(e)=>onChange(e.target.value)}
placeholder="🔎 ابحث عن منتج..."
style={{
width:"100%",
padding:"15px",
borderRadius:"12px",
border:"1px solid #D4AF37",
background:"#111",
color:"#fff",
fontSize:"16px"
}}
/>

);

}