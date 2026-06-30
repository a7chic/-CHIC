import React,{useEffect,useState} from "react";
import {getAllUsers,getAdmins} from "../services/adminService";
import {getProducts} from "../services/productService";

export default function AdminDashboard(){

const [users,setUsers]=useState<any[]>([]);
const [admins,setAdmins]=useState<any[]>([]);
const [products,setProducts]=useState<any[]>([]);

useEffect(()=>{

const load=async()=>{

setUsers(await getAllUsers());

setAdmins(await getAdmins());

setProducts(await getProducts());

};

load();

},[]);

const cards=[

["👥","المستخدمون",users.length],

["👑","المشرفون",admins.length],

["📦","الإعلانات",products.length],

["⭐","المميزة",products.filter(p=>p.featured).length]

];

return(

<div style={{color:"#fff"}}>

<h1
style={{
color:"#D4AF37",
marginBottom:"20px",
fontSize:"34px"
}}
>
👑 غرفة صاحب موقع "ANAQA CHIC"
</h1>

<div
style={{
background:"linear-gradient(145deg,#181818,#090909)",
border:"2px solid #D4AF37",
borderRadius:"24px",
padding:"25px",
marginBottom:"30px",
boxShadow:"0 0 35px rgba(212,175,55,.25)"
}}
>

<h2
style={{
color:"#D4AF37",
marginTop:0,
marginBottom:"18px"
}}
>

🛡️ مركز التحكم الملكي

</h2>

<p
style={{
color:"#ddd",
lineHeight:"34px",
fontSize:"16px"
}}
>

مرحباً بك في غرفة صاحب موقع <b>ANAQA CHIC</b>.

<br/><br/>

من هذه الغرفة تستطيع إدارة المنصة بالكامل.

<br/>✔ إدارة جميع الإعلانات.
<br/>✔ تعديل أو حذف أي إعلان.
<br/>✔ إدارة المستخدمين.
<br/>✔ إدارة المشرفين.
<br/>✔ استقبال الشكاوى والبلاغات.
<br/>✔ متابعة محاولات الاحتيال.
<br/>✔ مراجعة التنبيهات الأمنية.
<br/>✔ حظر أو إعادة تفعيل الحسابات.
<br/>✔ الاطلاع على سجل العمليات.
<br/>✔ متابعة إحصائيات الموقع.

</p>

</div>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",
gap:"20px"
}}
>

{

cards.map(card=>

<div
key={String(card[1])}
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px",
textAlign:"center"
}}
>

<div style={{fontSize:"42px"}}>

{card[0]}

</div>

<h3 style={{color:"#D4AF37"}}>

{card[1]}

</h3>

<h1>

{card[2]}

</h1>

</div>

)

}

</div>

</div>

);

}
)

}

</div>

<div
style={{
marginTop:"40px",
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"25px"
}}
>

<h2 style={{color:"#D4AF37"}}>

🚨 مركز مكافحة الاحتيال

</h2>

<ul
style={{
lineHeight:"38px",
color:"#ddd",
paddingRight:"20px"
}}
>

<li>مراجعة البلاغات الواردة.</li>
<li>تنبيهات عند اكتشاف نشاط مشبوه.</li>
<li>مراجعة الحسابات المخالفة.</li>
<li>إيقاف أو إعادة تفعيل الحسابات.</li>
<li>إدارة الإعلانات المخالفة.</li>
<li>سجل العمليات الإدارية.</li>

</ul>

</div>

</div>

);

}