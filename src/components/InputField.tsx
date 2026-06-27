import React from "react";


interface Props{

label:string;

placeholder?:string;

type?:string;

value:string;

onChange:(value:string)=>void;

}



export default function InputField({
label,
placeholder,
type="text",
value,
onChange
}:Props){


return(

<div
style={{
marginBottom:"15px"
}}
>


<label
style={{
display:"block",
color:"#D4AF37",
marginBottom:"8px",
fontWeight:"bold"
}}
>

{label}

</label>



<input
type={type}
placeholder={placeholder}
value={value}
onChange={(e)=>onChange(e.target.value)}
style={{
width:"100%",
padding:"14px",
background:"#111",
color:"#fff",
border:"1px solid #333",
borderRadius:"10px"
}}
/>


</div>

);

}