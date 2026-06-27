export default function Sidebar(){

const menus=[

"الرئيسية",
"الكتالوجات",
"الحراج",
"الإعلانات",
"الذكاء الاصطناعي",
"غرفة صاحب الموقع"

];

return(

<div
style={{
background:"#0b0b0b",
borderLeft:"1px solid #d4af37",
padding:"25px"
}}
>

<h2
style={{
color:"#d4af37",
marginBottom:"25px"
}}
>

القائمة

</h2>

{menus.map((m)=>(

<div
key={m}
style={{
padding:"15px",
marginBottom:"10px",
background:"#151515",
borderRadius:"12px",
color:"white"
}}
>

{m}

</div>

))}

</div>

);

}