import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, increaseLikes, increaseViews } from "../services/productService";

export default function ProductDetails(){

const {id}=useParams();

const navigate=useNavigate();

const [product,setProduct]=useState<any>(null);

useEffect(()=>{

const load=async()=>{

const products:any[]=await getProducts();

const item=products.find(p=>p.id===id);

if(item){

setProduct(item);

await increaseViews(item.id);

}

};

load();

},[id]);

if(!product){

return(

<div style={{padding:"40px",color:"#D4AF37"}}>

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

<div style={{color:"#fff"}}>

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"30px"
}}
>

<img

src={product.image}

alt={product.title}

style={{

width:"100%",

maxHeight:"500px",

objectFit:"cover",

borderRadius:"15px",

marginBottom:"20px"

}}

/>

<h1 style={{color:"#D4AF37"}}>

{product.title}

</h1>

<h2>

💰 {product.price} ريال

</h2>

<p>

📂 {product.category}

</p>

<p>

🏷️ {product.brand||"-"}

</p>

<p>

📍 {product.city||"-"}

</p>

<p>

⭐ {product.condition||"-"}

</p>

<p>

👁️ {product.views||0} مشاهدة

</p>

<p>

❤️ {product.likes||0} إعجاب

</p>

<hr style={{margin:"25px 0"}}/>

<p
style={{
lineHeight:"32px",
color:"#ddd"
}}
>

{product.description}

</p>

<div
style={{
display:"flex",
gap:"15px",
flexWrap:"wrap",
marginTop:"30px"
}}
>

<button
onClick={like}
style={{
background:"#D4AF37",
border:"none",
padding:"14px 22px",
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
padding:"14px 22px",
borderRadius:"10px",
cursor:"pointer"
}}
>

💬 مراسلة البائع

</button>

<button
onClick={()=>navigator.share?.({
title:product.title,
text:product.description
})}
style={{
background:"#222",
color:"#fff",
border:"1px solid #555",
padding:"14px 22px",
borderRadius:"10px",
cursor:"pointer"
}}
>

📤 مشاركة

</button>

</div>

</div>

</div>

);

}