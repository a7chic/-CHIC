import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

export default function Home(){

const navigate=useNavigate();

const [products,setProducts]=useState<any[]>([]);

useEffect(()=>{

const load=async()=>{

const data:any[]=await getProducts();

setProducts(data.slice(0,6));

};

load();

},[]);

return(

<div
style={{
color:"#fff"
}}
>

<div
style={{
background:"linear-gradient(135deg,#111,#1d1d1d)",
border:"2px solid #D4AF37",
borderRadius:"25px",
padding:"40px",
marginBottom:"30px",
textAlign:"center"
}}
>

<h1
style={{
color:"#D4AF37",
fontSize:"40px"
}}
>

👑 مرحباً بك في ANAQA CHIC

</h1>

<p
style={{
fontSize:"18px",
color:"#ccc",
maxWidth:"700px",
margin:"20px auto"
}}
>

منصة متخصصة لبيع وشراء الأزياء والحقائب والأحذية والإكسسوارات
بطابع فاخر وتجربة استخدام مميزة.

</p>

<button
onClick={()=>navigate("/haraj")}
style={{
background:"#D4AF37",
color:"#000",
border:"none",
padding:"16px 35px",
borderRadius:"12px",
fontWeight:"bold",
cursor:"pointer",
fontSize:"16px"
}}
>

🛒 تصفح الحراج

</button>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"20px",
marginBottom:"35px"
}}
>

{[
["👗","فساتين"],
["👜","شنط"],
["👠","أحذية"],
["💍","إكسسوارات"]
].map(item=>(

<div
key={item[1]}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
textAlign:"center"
}}
>

<div
style={{
fontSize:"45px"
}}
>

{item[0]}

</div>

<h3
style={{
color:"#D4AF37"
}}
>

{item[1]}

</h3>

</div>

))}

</div>

<h2
style={{
color:"#D4AF37",
marginBottom:"20px"
}}
>

🔥 أحدث الإعلانات

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px"
}}
>

{products.map(product=>(

<div
key={product.id}
onClick={()=>navigate(`/product/${product.id}`)}
style={{
cursor:"pointer"
}}
>

<ProductCard
title={product.title}
price={product.price}
image={product.image}
category={product.category}
/>

</div>

))}

</div>

</div>

);

}