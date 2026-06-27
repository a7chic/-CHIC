import React from "react";


interface Props{

loading:boolean;

text:string;

}



export default function LoadingButton({
loading,
text
}:Props){


return(

<button
disabled={loading}
style={{
background:"#D4AF37",
color:"#000",
border:"none",
padding:"14px 25px",
borderRadius:"12px",
fontWeight:"bold",
cursor:"pointer",
opacity:loading?0.6:1
}}
>

{loading ? "جاري التنفيذ..." : text}

</button>

);

}