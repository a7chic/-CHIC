import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

export default function Favorites(){

const navigate=useNavigate();

const [favorites,setFavorites]=useState<any[]>([]);

useEffect(()=>{

const load=async()=>{

const ids:string[]=JSON.parse(

localStorage.getItem("favorites")||"[]"

);

const products:any[]=await getProducts();

setFavorites(

products.filter(

item=>ids.includes(item.id)

)

);

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
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
flexWrap:"wrap"
}}
>

<div>

<h1
style={{
color:"#D4AF37",
margin:0
}}
>

❤️ المفضلة

</h1>

<p
style={{
color:"#aaa"
}}
>

العناصر المحفوظة: {favorites.length}

</p>

</div>

<button
onClick={()=>navigate("/haraj")}
style={{
background:"#D4AF37",
border:"none",
padding:"12px 22px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

🛒 الذهاب للحراج

</button>

</div>

{

favorites.length===0?

(

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"60px",
textAlign:"center"
}}
>

<div
style={{
fontSize:"70px"
}}
>

❤️

</div>

<h2
style={{
color:"#D4AF37"
}}
>

لا توجد منتجات محفوظة

</h2>

<p
style={{
color:"#999"
}}
>

أضف المنتجات إلى المفضلة لتظهر هنا.

</p>

</div>

)

:

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px"
}}
>

{

favorites.map(product=>(

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

))

}

</div>

}

</div>

);

}