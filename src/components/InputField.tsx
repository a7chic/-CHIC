import React from "react";

interface Props{
label:string;
value:string;
onChange:(value:string)=>void;
type?:string;
placeholder?:string;
}

export default function InputField({
label,
value,
onChange,
type="text",
placeholder=""
}:Props){

return(

<div style={{marginBottom:"18px"}}>

<label
style={{
display:"block",
marginBottom:"8px",
color:"#D4AF37",
fontWeight:"bold"
}}
>

{label}

</label>

<input
type={type}
value={value}
placeholder={placeholder}
onChange={(e)=>onChange(e.target.value)}
style={{
width:"100%",
padding:"14px",
background:"#181818",
color:"#fff",
border:"1px solid #333",
borderRadius:"10px",
boxSizing:"border-box",
outline:"none"
}}
/>

</div>

);

}