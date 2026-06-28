import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { getProducts } from "../services/productService";

export default function Profile(){

const navigate=useNavigate();

const user = auth.currentUser;

const [myProducts,setMyProducts]=useState<any[]>([]);

useEffect(()=>{

const load=async()=>{

const products:any[]=await getProducts();

setMyProducts(
products.filter(
item=>item.ownerId===user?.uid
)
);

};

if(user){

load();

}

},[user]);

const totalViews=useMemo(
()=>myProducts.reduce((sum,item)=>sum+(item.views||0),0),
[myProducts]
);

const totalLikes=useMemo(
()=>myProducts.reduce((sum,item)=>sum+(item.likes||0),0),
[myProducts]
);

const featuredCount=useMemo(
()=>myProducts.filter(item=>item.featured).length,
[myProducts]
);

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

<div
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
gap:"20px",
flexWrap:"wrap"
}}
>

<div
style={{
display:"flex",
alignItems:"center",
gap:"20px"
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
fontSize:"42px",
color:"#000"
}}
>

👤

</div>

<div>

<h2
style={{
margin:0,
color:"#D4AF37"
}}
>

{user?.displayName || "مستخدم ANAQA CHIC"}

</h2>

<p style={{color:"#aaa"}}>

{user?.email}

</p>

</div>

</div>

<button
onClick={()=>navigate("/add-product")}
style={{
background:"#D4AF37",
border:"none",
padding:"12px 18px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

➕ إعلان جديد

</button>

</div>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",
gap:"18px",
marginBottom:"30px"
}}
>

{[
["📦","إعلاناتي",myProducts.length],
["👁️","المشاهدات",totalViews],
["❤️","الإعجابات",totalLikes],
["⭐","الإعلانات المميزة",featuredCount]
].map(card=>(

<div
key={String(card[1])}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"22px",
textAlign:"center"
}}
>

<div style={{fontSize:"36px"}}>

{card[0]}

</div>

<h3 style={{color:"#D4AF37"}}>

{card[1]}

</h3>

<h2>

{card[2]}

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

<h2 style={{color:"#D4AF37"}}>

📦 إعلاناتي

</h2>

{

myProducts.length===0

?

<p style={{color:"#888"}}>

لم تقم بإضافة أي إعلان حتى الآن.

</p>

:

myProducts.map(product=>(

<div
key={product.id}
style={{
background:"#1b1b1b",
borderRadius:"14px",
padding:"18px",
marginBottom:"15px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:"15px"
}}
>

<div>

<h3
style={{
margin:"0 0 10px",
color:"#D4AF37"
}}
>

{product.title}

</h3>

<div>💰 {product.price} ريال</div>

<div>👁️ {product.views||0}</div>

<div>❤️ {product.likes||0}</div>

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

فتح الإعلان

</button>

</div>

))

}

</div>

</div>

);

}