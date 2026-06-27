import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";


export default function ProductDetails(){


const {id}=useParams();


const [product,setProduct]=useState<any>(null);



useEffect(()=>{


const load=async()=>{


const products:any[]=await getProducts();


const item=products.find(
(p)=>p.id===id
);


setProduct(item);


};



load();


},[id]);



if(!product){

return(

<div
style={{
color:"#D4AF37",
padding:"30px"
}}
>

جاري تحميل المنتج...

</div>

);

}



return(

<div
style={{
color:"#fff"
}}
>


<ProductCard

title={product.title}

price={product.price}

image={product.image}

category={product.category}

/>



<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
marginTop:"20px"
}}
>


<h2
style={{
color:"#D4AF37"
}}
>

تفاصيل المنتج

</h2>



<p>

{product.description}

</p>


</div>


</div>

);

}