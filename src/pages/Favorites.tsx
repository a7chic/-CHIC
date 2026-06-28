import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Favorites(){

const navigate=useNavigate();

const [favorites,setFavorites]=useState<any[]>([]);

useEffect(()=>{

const data=JSON.parse(

localStorage.getItem("favorites")||"[]"

);

setFavorites(data);

},[]);

return(

<div style={{color:"#fff"}}>

<h1
style={{
color:"#D4AF37",
marginBottom:"25px"
}}
>

❤️ المفضلة

</h1>

{

favorites.length===0?

<div
style={{
background:"#111",
padding:"45px",
borderRadius:"18px",
border:"1px solid #D4AF37",
textAlign:"center"
}}
>

<div style={{fontSize:"60px"}}>

💔

</div>

<h2
style={{
color:"#D4AF37"
}}
>

لا توجد منتجات محفوظة

</h2>

</div>

:

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px"
}}
>

{

favorites.map((item:any)=>

<div
key={item.id}
onClick={()=>navigate(`/product/${item.id}`)}
style={{
cursor:"pointer"
}}
>

<ProductCard

title={item.title}

price={item.price}

image={item.image}

category={item.category}

/>

</div>

)

}

</div>

}

</div>

);

}