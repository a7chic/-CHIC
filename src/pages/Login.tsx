import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";


export default function Login(){

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();


const handleLogin = async()=>{

try{

await loginUser(
email,
password
);

navigate("/home");

}catch(error){

alert("بيانات الدخول غير صحيحة");

}

};



return(

<div
style={{
minHeight:"100vh",
background:"#050505",
display:"flex",
justifyContent:"center",
alignItems:"center",
color:"#fff"
}}
>


<div
style={{
width:"380px",
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"35px",
textAlign:"center"
}}
>


<h1
style={{
color:"#D4AF37"
}}
>

👑 ANAQA CHIC

</h1>


<h2>

تسجيل الدخول

</h2>



<input
placeholder="البريد الإلكتروني"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{
width:"100%",
padding:"14px",
margin:"10px 0",
borderRadius:"10px",
border:"none"
}}
/>



<input
type="password"
placeholder="كلمة المرور"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"14px",
margin:"10px 0",
borderRadius:"10px",
border:"none"
}}
/>



<button
onClick={handleLogin}
style={{
width:"100%",
padding:"14px",
marginTop:"15px",
background:"#D4AF37",
border:"none",
borderRadius:"10px",
fontWeight:"bold",
cursor:"pointer"
}}
>

دخول

</button>



<p
style={{
marginTop:"20px"
}}
>

ليس لديك حساب؟

<Link
to="/register"
style={{
color:"#D4AF37",
marginRight:"8px"
}}
>

إنشاء حساب

</Link>


</p>


</div>


</div>

);

}