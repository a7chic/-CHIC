import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {getProducts} from "../services/productService";

export default function Categories(){

const navigate=useNavigate();

const [categories,setCategories]=useState<any[]>([]);

useEffect(()=>{

const load=async()=>{

const products=await getProducts();

const counts:any={};

products.forEach((item:any)=>{

counts[item.category]=(counts[item.category]||0)+1;

});

setCategories(Object.entries(counts));

};

load();

},[]);

return(

<div style={{color:"#fff"}}>

<h1 style={{color:"#D4AF37"}}>

📂 الأقسام

</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
gap:"20px",
marginTop:"25px"
}}
>

{

categories.map(([name,count])=>

<div
key={String(name)}
onClick={()=>navigate(`/search?category=${name}`)}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"30px",
cursor:"pointer",
textAlign:"center"
}}
>

<div style={{fontSize:"50px"}}>

📦

</div>

<h2 style={{color:"#D4AF37"}}>

{name}

</h2>

<p>

{Number(count)} إعلان

</p>

</div>

)

}

</div>

</div>

);

}