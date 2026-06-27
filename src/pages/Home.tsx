import Layout from "../components/Layout";

export default function Home(){

const sections=[

"فساتين السهرة",

"فساتين الأعراس",

"العبايات",

"الشناط",

"الأحذية",

"الأسر المنتجة",

"الإعلانات",

"حراج أناقة CHIC"

];

return(

<Layout title="الرئيسية">

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",
gap:"20px"
}}
>

{sections.map((item)=>(

<div
key={item}
style={{
background:"#111",
border:"1px solid #D4AF37",
padding:"30px",
borderRadius:"18px",
textAlign:"center",
fontWeight:"bold",
cursor:"pointer"
}}
>

{item}

</div>

))}

</div>

</Layout>

);

}