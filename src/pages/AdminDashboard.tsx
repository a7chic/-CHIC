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
marginBottom:"25px"
}}
>

👑 غرفة صاحب موقع "ANAQA CHIC"

</h1>

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