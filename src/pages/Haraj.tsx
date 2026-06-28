import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { getProducts } from "../services/productService";

export default function Haraj(){

const navigate=useNavigate();

const [products,setProducts]=useState<any[]>([]);
const [search,setSearch]=useState("");
const [category,setCategory]=useState("الكل");

useEffect(()=>{

const load=async()=>{

const data:any[]=await getProducts();

setProducts(data);

};

load();

},[]);

const categories=[
"الكل",
...new Set(
products.map(item=>item.category).filter(Boolean)
)
];

const filtered=useMemo(()=>{

return products.filter(item=>{

const matchCategory=

category==="الكل"

||

item.category===category;

const keyword=search.toLowerCase();

const matchSearch=

item.title?.toLowerCase().includes(keyword)

||

item.category?.toLowerCase().includes(keyword)

||

item.city?.toLowerCase().includes(keyword)

||

item.brand?.toLowerCase().includes(keyword);

return matchCategory && matchSearch;

});

},[products,search,category]);

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

🛒 الحراج

</h1>

<p
style={{
color:"#aaa",
marginTop:"10px"
}}
>

تصفح جميع الإعلانات المنشورة.

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

<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

style={{

marginTop:"20px",

width:"100%",

padding:"14px",

background:"#1b1b1b",

color:"#fff",

border:"1px solid #333",

borderRadius:"10px"

}}

>

{

categories.map(item=>

<option
key={item}
value={item}
>

{item}

</option>

)

}

</select>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px"
}}
>

{

filtered.map(product=>

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

)

}

</div>

{

filtered.length===0 &&

<div
style={{
textAlign:"center",
marginTop:"50px",
color:"#888"
}}
>

لا توجد إعلانات حالياً.

</div>

}

</div>

);

}