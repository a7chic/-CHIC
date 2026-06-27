import React from "react";
import CategoryCard from "../components/CategoryCard";


const categories=[

{
icon:"👗",
title:"فساتين"
},

{
icon:"👜",
title:"شنط"
},

{
icon:"👠",
title:"أحذية"
},

{
icon:"💍",
title:"إكسسوارات"
},

{
icon:"🧥",
title:"عبايات"
},

{
icon:"⌚",
title:"ساعات"
}

];



export default function Categories(){


return(

<div
style={{
color:"#fff"
}}
>


<h1
style={{
color:"#D4AF37"
}}
>

✨ أقسام أناقة CHIC

</h1>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"20px"
}}
>


{
categories.map(
(item)=>(


<CategoryCard

key={item.title}

icon={item.icon}

title={item.title}

/>


)

)
}



</div>


</div>

);

}