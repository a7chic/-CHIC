import React from "react";

export default function Haraj() {

return (

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


<h1
style={{
color:"#D4AF37"
}}
>

🛒 الحراج

</h1>


<p
style={{
color:"#ccc",
fontSize:"18px"
}}
>

سوق أناقة CHIC لعرض وشراء المنتجات المميزة

</p>


</div>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}
>


{[
["👗","فساتين راقية","0 إعلان"],
["👜","حقائب وإكسسوارات","0 إعلان"],
["👠","أحذية فاخرة","0 إعلان"],
["💎","مجوهرات","0 إعلان"]
].map((item)=>(


<div
key={item[1]}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px"
}}
>


<div
style={{
fontSize:"45px"
}}
>

{item[0]}

</div>


<h2
style={{
color:"#D4AF37"
}}
>

{item[1]}

</h2>


<p
style={{
color:"#bbb"
}}
>

{item[2]}

</p>


<button
style={{
background:"#D4AF37",
border:"none",
padding:"12px 20px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

إضافة إعلان

</button>


</div>


))}


</div>


</div>

);

}