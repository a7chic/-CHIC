import React from "react";

export default function Home() {

return (

<div
style={{
color:"#fff"
}}
>


<section
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"40px",
textAlign:"center",
marginBottom:"25px"
}}
>


<h1
style={{
color:"#D4AF37",
fontSize:"42px",
marginBottom:"15px"
}}
>

👑 أناقة CHIC

</h1>


<p
style={{
fontSize:"20px",
color:"#ddd"
}}
>

منصة التسوق الملكية للأزياء والإعلانات المميزة

</p>


</section>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}
>


{[
["👗","الأزياء","اكتشف أحدث التصاميم"],
["🛒","الحراج","بيع وشراء المنتجات"],
["✨","المميز","عروض مختارة بعناية"],
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
fontSize:"40px"
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
color:"#ccc"
}}
>

{item[2]}

</p>


</div>


))}


</div>


</div>

);

}