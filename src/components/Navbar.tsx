import React from "react";
import { Link } from "react-router-dom";


export default function Navbar(){

return(

<nav
style={{
background:"#111",
borderBottom:"2px solid #D4AF37",
padding:"15px",
display:"flex",
justifyContent:"space-around"
}}
>


<Link
to="/home"
style={{
color:"#D4AF37",
textDecoration:"none",
fontWeight:"bold"
}}
>

🏠 الرئيسية

</Link>



<Link
to="/haraj"
style={{
color:"#fff",
textDecoration:"none"
}}
>

🛒 الحراج

</Link>



<Link
to="/catalog"
style={{
color:"#fff",
textDecoration:"none"
}}
>

👗 الكتالوج

</Link>



<Link
to="/profile"
style={{
color:"#fff",
textDecoration:"none"
}}
>

👤 حسابي

</Link>


</nav>

);

}