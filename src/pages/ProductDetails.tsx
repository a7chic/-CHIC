import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import {
getProducts,
increaseViews,
increaseLikes
} from "../services/productService";

export default function ProductDetails(){

const {id}=useParams();

const navigate=useNavigate();

const [product,setProduct]=useState<any>(null);

useEffect(()=>{

const load=async()=>{

const products:any[]=await getProducts();

const item=products.find(
(p)=>p.id===id
);

if(item){

setProduct(item);

await increaseViews(item.id);

}

};

load();

},[id]);

if(!product){

return(

<div
style={{
padding:"40px",
color:"#D4AF37"
}}
>

جاري تحميل الإعلان...

</div>

);

}

const like=async()=>{

await increaseLikes(product.id);

setProduct({

...product,

likes:(product.likes||0)+1

});

};

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
borderRadius:"20px",
padding:"25px",
marginTop:"20px"
}}
>

<h2
style={{
color:"#D4AF37"
}}
>

{product.title}

</h2>

<p>

💰 {product.price} ريال

</p>

<p>

📍 {product.city||"غير محددة"}

</p>

<p>

🏷️ {product.brand||"غير محددة"}

</p>

<p>

⭐ {product.condition||"غير محددة"}

</p>

<p>

👁️ {product.views||0} مشاهدة

</p>

<p>

❤️ {product.likes||0} إعجاب

</p>

<p
style={{
lineHeight:"30px"
}}
>

{product.description}

</p>

<div
style={{
display:"flex",
gap:"12px",
flexWrap:"wrap",
marginTop:"20px"
}}
>

<button
onClick={like}
style={{
background:"#D4AF37",
border:"none",
padding:"12px 20px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

❤️ أعجبني

</button>

<button
onClick={()=>navigate(`/chat/${product.ownerId}`)}
style={{
background:"#222",
color:"#fff",
border:"1px solid #555",
padding:"12px 20px",
borderRadius:"10px",
cursor:"pointer"
}}
>

💬 مراسلة البائع

</button>

<button
style={{
background:"#222",
color:"#fff",
border:"1px solid #555",
padding:"12px 20px",
borderRadius:"10px"
}}
>

📤 مشاركة

</button>

</div>

</div>

</div>

);

}