import React, { useEffect, useState } from "react";

import {
getAllUsers,
getAdmins
} from "../services/adminService";


export default function AdminDashboard(){


const [users,setUsers]=useState<any[]>([]);

const [admins,setAdmins]=useState<any[]>([]);



useEffect(()=>{


const load=async()=>{


const allUsers=
await getAllUsers();


const allAdmins=
await getAdmins();



setUsers(allUsers);

setAdmins(allAdmins);


};



load();


},[]);




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

👑 لوحة تحكم الإدارة

</h1>



<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}
>


<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px"
}}
>

<h2>

👥 المستخدمون

</h2>


<h1
style={{
color:"#D4AF37"
}}
>

{users.length}

</h1>


</div>




<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"25px"
}}
>

<h2>

👑 المشرفون

</h2>


<h1
style={{
color:"#D4AF37"
}}
>

{admins.length}

</h1>


</div>



</div>


</div>

);

}