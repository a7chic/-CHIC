import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";


export default function Home(){

const navigate = useNavigate();

const [products,setProducts] = useState<any[]>([]);
const [search,setSearch] = useState("");



useEffect(()=>{

const load = async()=>{

const data:any[] = await getProducts();

setProducts(data);

};

load();

},[]);




const filteredProducts = useMemo(()=>{

return products.filter(item=>{

const keyword = search.toLowerCase();


return (

item.title?.toLowerCase().includes(keyword)

||

item.category?.toLowerCase().includes(keyword)

||

item.city?.toLowerCase().includes(keyword)

||

item.brand?.toLowerCase().includes(keyword)

);


});


},[products,search]);



const featured =
filteredProducts.filter(item=>item.featured);


const latest =
filteredProducts.filter(item=>!item.featured);



return(

<div
style={{
color:"#fff"
}}
>



<div

style={{

background:"linear-gradient(145deg,#111,#050505)",

border:"1px solid #D4AF37",

borderRadius:"25px",

padding:"30px",

marginBottom:"25px",

boxShadow:"0 0 25px rgba(212,175,55,.15)"

}}

>



<h1

style={{

margin:0,

color:"#D4AF37",

fontSize:"34px"

}}

>

👑 ANAQA CHIC

</h1>



<p

style={{

color:"#bbb",

marginTop:"12px",

fontSize:"16px"

}}

>

اكتشف أفضل المنتجات والإعلانات الفاخرة

</p>




<SearchBar

value={search}

onChange={setSearch}

/>



</div>




<div

style={{

background:"#111",

border:"1px solid #D4AF37",

borderRadius:"20px",

padding:"20px",

marginBottom:"30px"

}}

>


<h2

style={{

color:"#D4AF37",

marginTop:0

}}

>

👑 غرفة صاحب الموقع

</h2>



<p

style={{

color:"#aaa"

}}

>

للشكاوى والبلاغات والدعم ومتابعة أمان المنصة

</p>



<button

onClick={()=>navigate("/owner")}

style={{

background:"#D4AF37",

border:"none",

padding:"12px 25px",

borderRadius:"12px",

fontWeight:"bold",

cursor:"pointer"

}}

>

دخول الغرفة

</button>


</div>





{

featured.length>0 &&

<>


<h2

style={{

color:"#D4AF37"

}}

>

⭐ الإعلانات المميزة

</h2>



<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",

gap:"20px"

}}

>


{

featured.map(item=>(


<div

key={item.id}

onClick={()=>navigate(`/product/${item.id}`)}

style={{

cursor:"pointer"

}}

>


<ProductCard

title={item.title}

price={item.price}

image={item.image}

category={item.category}

/>


</div>


))

}


</div>


</>


}




<h2

style={{

color:"#D4AF37",

marginTop:"35px"

}}

>

🆕 أحدث الإعلانات

</h2>



<div

style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",

gap:"20px"

}}

>


{

latest.map(item=>(


<div

key={item.id}

onClick={()=>navigate(`/product/${item.id}`)}

style={{

cursor:"pointer"

}}

>


<ProductCard

title={item.title}

price={item.price}

image={item.image}

category={item.category}

/>


</div>


))


}


</div>




{

filteredProducts.length===0 &&


<div

style={{

textAlign:"center",

marginTop:"40px",

color:"#888"

}}

>

لا توجد نتائج مطابقة

</div>


}



</div>


);

}