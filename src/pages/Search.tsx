import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";


export default function Search(){


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



const result=products.filter(
(item)=>

item.title
?.toLowerCase()
.includes(
value.toLowerCase()
)

);



setFiltered(result);


};



return(

<div
style={{
color:"#fff"
}}
>


<h1
style={{
color:"#D4AF37"
}}
>

🔎 البحث في أناقة CHIC

</h1>



<SearchBar

value={search}

onChange={handleSearch}

/>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginTop:"25px"
}}
>


{filtered.map(
(product)=>(


<ProductCard

key={product.id}

title={product.title}

price={product.price}

image={product.image}

category={product.category}

/>


)

)}


</div>


</div>

);

}