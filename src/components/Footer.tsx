import React from "react";

export default function Footer(){

return(

<footer
style={{
marginTop:"50px",
padding:"25px",
textAlign:"center",
background:"#111",
borderTop:"1px solid #D4AF37",
color:"#888"
}}
>

<h3
style={{
color:"#D4AF37",
marginBottom:"10px"
}}
>

👑 ANAQA CHIC

</h3>

<p>

منصة الأزياء والإعلانات الفاخرة

</p>

<p
style={{
marginTop:"15px",
fontSize:"14px"
}}
>

© {new Date().getFullYear()} ANAQA CHIC - جميع الحقوق محفوظة

</p>

</footer>

);

}