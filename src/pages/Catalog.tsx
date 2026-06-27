import Layout from "../components/Layout";
import QuickCard from "../components/QuickCard";

export default function Catalog(){

return(

<Layout title="الكتالوجات">

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px"
}}
>

<QuickCard icon="👗" title="فساتين السهرة"/>

<QuickCard icon="👑" title="فساتين الأعراس"/>

<QuickCard icon="🧥" title="العبايات"/>

<QuickCard icon="👜" title="الشناط"/>

<QuickCard icon="👠" title="الأحذية"/>

<QuickCard icon="👧" title="فساتين الأطفال"/>

<QuickCard icon="🏡" title="الأسر المنتجة"/>

</div>

</Layout>

);

}