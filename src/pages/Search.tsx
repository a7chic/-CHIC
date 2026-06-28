import React,{useMemo,useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import {getProducts} from "../services/productService";

export default function Search(){

const navigate=useNavigate();

const [search,setSearch]=useState("");

const [products,setProducts]=useState<any[]>([]);

useEffect(()=>{

const load=async()=>{

setProducts(await getProducts());

};

load();

},[]);

const result=useMemo(()=>{

return products.filter(item=>

item.title?.toLowerCase().includes(search.toLowerCase())

||

item.description?.toLowerCase().includes(search.toLowerCase())

||

item.category?.toLowerCase().includes(search.toLowerCase())

||

item.city?.toLowerCase().includes(search.toLowerCase())

);

},[products,search]);

return(

<div style={{color:"#fff"}}>

<h1 style={{color:"#D4AF37"}}>

🔍 البحث

</h1>

<SearchBar

value={search}

onChange={setSearch}

/>

<p
style={{
marginTop:"20px",
color:"#888"
}}
>

عدد النتائج: {result.length}

</p>

<div
style={{
marginTop:"20px",
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
gap:"20px"
}}
>

{

result.map(item=>

<div
key={item.id}
onClick={()=>navigate(`/product/${item.id}`)}
style={{cursor:"pointer"}}
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

</div>

);

}