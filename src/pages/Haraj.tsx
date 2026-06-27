import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function Haraj(){

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

item.title
?.toLowerCase()
.includes(value.toLowerCase())

||

item.category
?.toLowerCase()
.includes(value.toLowerCase())

||

item.city
?.toLowerCase()
.includes(value.toLowerCase())

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
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"25px",
gap:"20px",
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

🛒 حراج أناقة CHIC

</h1>

<p
style={{
color:"#aaa"
}}
>

عدد الإعلانات: {filtered.length}

</p>

</div>

<button
onClick={()=>navigate("/add-product")}
style={{
background:"#D4AF37",
border:"none",
padding:"14px 22px",
borderRadius:"12px",
fontWeight:"bold",
cursor:"pointer"
}}
>

➕ إضافة إعلان

</button>

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

filtered.length===0 ?

(

<div
style={{
gridColumn:"1/-1",
textAlign:"center",
padding:"60px",
background:"#111",
borderRadius:"20px",
border:"1px solid #D4AF37"
}}
>

<h2
style={{
color:"#D4AF37"
}}
>

لا توجد إعلانات حالياً

</h2>

<p
style={{
color:"#aaa"
}}
>

كن أول من يضيف إعلاناً في المنصة.

</p>

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