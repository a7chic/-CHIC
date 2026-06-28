import React from "react";

interface Props{
loading:boolean;
text:string;
loadingText?:string;
onClick?:()=>void;
type?:"button"|"submit";
}

export default function LoadingButton({
loading,
text,
loadingText="جاري التنفيذ...",
onClick,
type="button"
}:Props){

return(

<button
type={type}
onClick={onClick}
disabled={loading}
style={{
width:"100%",
padding:"14px",
background:loading?"#777":"#D4AF37",
color:"#000",
border:"none",
borderRadius:"10px",
fontWeight:"bold",
cursor:loading?"not-allowed":"pointer",
fontSize:"16px"
}}
>

{loading?"⏳ "+loadingText:text}

</button>

);

}