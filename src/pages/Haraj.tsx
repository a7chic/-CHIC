import Layout from "../components/Layout";
import QuickCard from "../components/QuickCard";

export default function Haraj(){

return(

<Layout title="منصة حراج">

<h1
style={{
color:"#D4AF37",
marginBottom:"25px"
}}
>

🛒 منصة حراج أناقة CHIC

</h1>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px"
}}
>

<QuickCard icon="➕" title="إضافة إعلان"/>

<QuickCard icon="🔥" title="أحدث الإعلانات"/>

<QuickCard icon="⭐" title="الإعلانات المميزة"/>

<QuickCard icon="🏷️" title="الأقسام"/>

</div>

</Layout>

);

}