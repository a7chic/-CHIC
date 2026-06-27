<main
style={{
flex:1,
padding:"25px",
overflowY:"auto",
background:"#050505"
}}
>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px",
marginBottom:"25px"
}}
>

{[
["👥","المستخدمون","0"],
["🛒","الإعلانات","0"],
["👑","المشرفون","0"],
["💬","التعليقات","0"]
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
marginTop:"10px"
}}
>

{item[1]}

</h2>

<h1
style={{
color:"#D4AF37",
marginTop:"10px"
}}
>

{item[2]}

</h1>

</div>

))}

</div>

<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"20px",
minHeight:"500px"
}}
>

<Outlet/>

</div>
 </main>

</div>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"15px 25px",
background:"#0a0a0a",
borderTop:"1px solid #D4AF37"
}}
>

<div
style={{
color:"#D4AF37",
fontSize:"14px",
fontWeight:"bold"
}}
>

لوحة التحكم الملكية

</div>


<div
style={{
color:"#aaa",
fontSize:"13px"
}}
>

ANAQA CHIC ADMIN SYSTEM

</div>


</div>
<footer
style={{
height:"60px",
background:"#111",
borderTop:"2px solid #D4AF37",
display:"flex",
justifyContent:"center",
alignItems:"center",
fontWeight:"bold",
color:"#D4AF37",
fontSize:"14px"
}}
>

© 2026 ANAQA CHIC

</footer>

</div>  
