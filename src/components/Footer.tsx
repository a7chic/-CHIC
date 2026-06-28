import React from "react";
import { Link } from "react-router-dom";

export default function Footer(){

const year=new Date().getFullYear();

return(

<footer
style={{
marginTop:"40px",
background:"#111",
borderTop:"2px solid #D4AF37",
padding:"25px",
color:"#fff"
}}
>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap",
gap:"20px",
maxWidth:"1400px",
margin:"0 auto"
}}
>

<div>

<h3
style={{
margin:"0 0 10px",
color:"#D4AF37"
}}
>

👑 ANAQA CHIC

</h3>

<p
style={{
margin:0,
color:"#aaa"
}}
>

منصة فاخرة لبيع وشراء الأزياء والإكسسوارات.

</p>

</div>

<div
style={{
display:"flex",
gap:"18px",
flexWrap:"wrap"
}}
>

<Link
to="/home"
style={{
color:"#D4AF37",
textDecoration:"none"
}}
>

الرئيسية

</Link>

<Link
to="/haraj"
style={{
color:"#D4AF37",
textDecoration:"none"
}}
>

الحراج

</Link>

<Link
to="/catalog"
style={{
color:"#D4AF37",
textDecoration:"none"
}}
>

الكتالوج

</Link>

<Link
to="/profile"
style={{
color:"#D4AF37",
textDecoration:"none"
}}
>

حسابي

</Link>

</div>

</div>

<div
style={{
marginTop:"25px",
paddingTop:"20px",
borderTop:"1px solid #333",
textAlign:"center",
color:"#888"
}}
>

© {year} ANAQA CHIC. جميع الحقوق محفوظة.

</div>

</footer>

);

}