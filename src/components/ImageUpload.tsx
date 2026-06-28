import React,{useRef,useState} from "react";

interface Props{
onUpload:(url:string)=>void;
}

export default function ImageUpload({onUpload}:Props){

const inputRef=useRef<HTMLInputElement>(null);

const [preview,setPreview]=useState("");

const choose=()=>{

inputRef.current?.click();

};

const change=(e:React.ChangeEvent<HTMLInputElement>)=>{

const file=e.target.files?.[0];

if(!file) return;

const url=URL.createObjectURL(file);

setPreview(url);

onUpload(url);

};

return(

<div>

<input
ref={inputRef}
type="file"
accept="image/*"
style={{display:"none"}}
onChange={change}
/>

<div
onClick={choose}
style={{
border:"2px dashed #D4AF37",
borderRadius:"15px",
padding:"25px",
textAlign:"center",
cursor:"pointer",
background:"#111"
}}
>

{

preview?

<img

src={preview}

alt="preview"

style={{
width:"100%",
maxHeight:"350px",
objectFit:"cover",
borderRadius:"12px"
}}

/>

:

<div>

<div style={{fontSize:"60px"}}>

📷

</div>

<p style={{color:"#D4AF37"}}>

اضغط لاختيار صورة

</p>

</div>

}

</div>

</div>

);

}