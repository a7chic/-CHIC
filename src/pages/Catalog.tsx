import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { getProducts } from "../services/productService";

export default function Catalog(){

const navigate=useNavigate();

const [products,setProducts]=useState<any[]>([]);
const [filtered,setFiltered]=useState<any[]>([]);
const [search,setSearch]=useState("");

useEffect(()=>{

const load=async()=>{

const data:any[]=await getProducts();

setProducts(data);

setFiltered(data);

};

load();

},[]);

const handleSearch=(value:string)=>{

setSearch(value);

const result=products.filter(item=>

item.title?.toLowerCase().includes(value.toLowerCase())

||

item.category?.toLowerCase().includes(value.toLowerCase())

||

item.brand?.toLowerCase().includes(value.toLowerCase())

);

setFiltered(result);

};

return(

<div
style={{
color:"#fff"
}}
>

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
color:"#D4AF37"
}}
>

👗 كتالوج ANAQA CHIC

</h1>

<p
style={{
color:"#aaa"
}}
>

استكشف جميع المنتجات بطريقة احترافية.

</p>

</div>

<SearchBar

value={search}

onChange={handleSearch}

/>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px",
marginTop:"25px"
}}
>

{

filtered.length===0?

(

<div
style={{
gridColumn:"1/-1",
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"50px",
textAlign:"center"
}}
>

<h2
style={{
color:"#D4AF37"
}}
>

لا توجد منتجات

</h2>

</div>

)

:

filtered.map(product=>(

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

</div>

);

}