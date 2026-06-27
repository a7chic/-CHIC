import React from "react";


interface Props{

message:string;

type?: "success" | "error" | "info";

}



export default function Alert({
message,
type="info"
}:Props){


const icon =
type==="success"
?"✅"
:
type==="error"
?"❌"
:
"ℹ️";



return(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"12px",
padding:"15px",
color:"#fff",
display:"flex",
gap:"10px",
alignItems:"center"
}}
>

<span>

{icon}

</span>


<span>

{message}

</span>


</div>

);

}