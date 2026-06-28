import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function Home(){

const navigate=useNavigate();

const [products,setProducts]=useState<any[]>([]);
const [search,setSearch]=useState("");

useEffect(()=>{

const load=async()=>{

const data:any[]=await getProducts();

setProducts(data);

};

load();

},[]);

const filteredProducts=useMemo(()=>{

return products.filter(item=>{

const keyword=search.toLowerCase();

return(

item.title?.toLowerCase().includes(keyword)

||

item.category?.toLowerCase().includes(keyword)

||

item.city?.toLowerCase().includes(keyword)

||

item.brand?.toLowerCase().includes(keyword)

);

});

},[products,search]);

const featured=filteredProducts.filter(item=>item.featured);

const latest=filteredProducts.filter(item=>!item.featured);

return(

<div style={{color:"#fff"}}>

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"30px",
marginBottom:"25px"
}}
>

<h1
style={{
margin:0,
color:"#D4AF37"
}}
>

👑 ANAQA CHIC

</h1>

<p
style={{
color:"#bbb",
marginTop:"10px"
}}
>

اكتشف أفضل المنتجات والإعلانات الفاخرة.

</p>

<div
style={{
marginTop:"20px"
}}
>

<SearchBar

value={search}

onChange={setSearch}

/>

</div>

</div>

{

featured.length>0 &&

<>

<h2
style={{
color:"#D4AF37",
marginBottom:"20px"
}}
>

⭐ الإعلانات المميزة

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px",
marginBottom:"35px"
}}
>

{

featured.map(item=>

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

</>

}

<h2
style={{
color:"#D4AF37",
marginBottom:"20px"
}}
>

🆕 أحدث الإعلانات

</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px"
}}
>

{

latest.map(item=>

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

{

filteredProducts.length===0 &&

<div
style={{
marginTop:"40px",
textAlign:"center",
color:"#888"
}}
>

لا توجد نتائج مطابقة.

</div>

}

</div>

);

}