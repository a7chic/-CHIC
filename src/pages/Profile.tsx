import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getProducts } from "../services/productService";

export default function Profile(){

const navigate=useNavigate();

const {user}=useAuth();

const [myProducts,setMyProducts]=useState<any[]>([]);

useEffect(()=>{

const load=async()=>{

const data:any[]=await getProducts();

setMyProducts(

data.filter(

item=>item.ownerId===user?.uid

)

);

};

if(user){

load();

}

},[user]);

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

<div
style={{
display:"flex",
alignItems:"center",
gap:"20px",
flexWrap:"wrap"
}}
>

<div
style={{
width:"90px",
height:"90px",
borderRadius:"50%",
background:"#D4AF37",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontSize:"45px",
color:"#000"
}}
>

👤

</div>

<div>

<h1
style={{
color:"#D4AF37",
margin:0
}}
>

{user?.displayName || "مستخدم أناقة CHIC"}

</h1>

<p
style={{
color:"#aaa"
}}
>

{user?.email || "لا يوجد بريد إلكتروني"}

</p>

</div>

</div>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
marginBottom:"30px"
}}
>

{[
["📦","إعلاناتي",myProducts.length],
["❤️","المفضلة","0"],
["👁️","إجمالي المشاهدات","0"],
["⭐","التقييم","5.0"]
].map(item=>(

<div
key={item[1]}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
textAlign:"center"
}}
>

<div
style={{
fontSize:"38px"
}}
>

{item[0]}

</div>

<h3
style={{
color:"#D4AF37"
}}
>

{item[1]}

</h3>

<h2>

{item[2]}

</h2>

</div>

))}

</div>

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"25px"
}}
>

<h2
style={{
color:"#D4AF37"
}}
>

📦 إعلاناتي

</h2>

{

myProducts.length===0?

(

<p
style={{
color:"#aaa"
}}
>

لا يوجد لديك إعلانات حتى الآن.

</p>

)

:

myProducts.map(product=>(

<div
key={product.id}
style={{
background:"#1b1b1b",
padding:"18px",
borderRadius:"12px",
marginBottom:"15px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap"
}}
>

<div>

<h3
style={{
margin:0,
color:"#D4AF37"
}}
>

{product.title}

</h3>

<p>

💰 {product.price} ريال

</p>

</div>

<button
onClick={()=>navigate(`/product/${product.id}`)}
style={{
background:"#D4AF37",
border:"none",
padding:"10px 18px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

عرض

</button>

</div>

))

}

</div>

</div>

);

}