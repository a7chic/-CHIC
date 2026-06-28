import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { getProducts } from "../services/productService";

export default function Catalog(){

const navigate=useNavigate();

const [products,setProducts]=useState<any[]>([]);
const [search,setSearch]=useState("");

useEffect(()=>{

const load=async()=>{

setProducts(await getProducts());

};

load();

},[]);

const filtered=useMemo(()=>{

return products.filter(item=>

item.title?.toLowerCase().includes(search.toLowerCase())

||

item.category?.toLowerCase().includes(search.toLowerCase())

||

item.brand?.toLowerCase().includes(search.toLowerCase())

);

},[products,search]);

return(

<div style={{color:"#fff"}}>

<h1 style={{color:"#D4AF37"}}>

👗 الكتالوج

</h1>

<div style={{margin:"20px 0"}}>

<SearchBar

value={search}

onChange={setSearch}

/>

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
style={{cursor:"pointer"}}
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

</div>

);

}