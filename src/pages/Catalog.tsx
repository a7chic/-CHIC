import React from "react";

export default function Catalog() {

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

👗 الكتالوج

</h1>


<p
style={{
color:"#ccc",
fontSize:"18px"
}}
>

تصفح أحدث المنتجات والتصاميم في أناقة CHIC

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
["👗","فساتين","تصاميم نسائية فاخرة"],
["🧥","أزياء رجالية","أناقة عصرية"],
["💍","إكسسوارات","تفاصيل تكمل إطلالتك"],
["👟","أحذية","اختيارات مميزة"]
].map((item)=>(


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
fontSize:"45px"
}}
>

{item[0]}

</div>


<h2
style={{
color:"#D4AF37",
marginTop:"15px"
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
color:"#000",
border:"none",
padding:"12px 25px",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

استعراض

</button>


</div>


))}


</div>


</div>

);

}