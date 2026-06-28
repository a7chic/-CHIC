import React from "react";
import {NavLink} from "react-router-dom";

export default function Navbar(){

const links=[

["الرئيسية","/home"],

["الحراج","/haraj"],

["الكتالوج","/catalog"],

["المفضلة","/favorites"],

["الإشعارات","/notifications"],

["حسابي","/profile"]

];

return(

<nav
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
gap:"15px",
padding:"18px",
background:"#111",
borderBottom:"1px solid #D4AF37",
flexWrap:"wrap"
}}
>

{

links.map(link=>

<NavLink

key={link[1]}

to={String(link[1])}

style={({isActive})=>({

padding:"10px 18px",

borderRadius:"10px",

textDecoration:"none",

fontWeight:"bold",

background:isActive?"#D4AF37":"transparent",

color:isActive?"#000":"#fff",

transition:"0.2s"

})}

>

{link[0]}

</NavLink>

)

}

</nav>

);
}