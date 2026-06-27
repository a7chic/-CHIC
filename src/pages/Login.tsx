import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

export default function Login(){

const navigate=useNavigate();

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);

const handleLogin=async()=>{

if(!email||!password){

alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");

return;

}

try{

setLoading(true);

await loginUser(
email.trim(),
password
);

navigate("/home");

}catch{

alert("البريد الإلكتروني أو كلمة المرور غير صحيحة");

}finally{

setLoading(false);

}

};

return(

<div
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#050505",
padding:"20px"
}}
>

<div
style={{
width:"100%",
maxWidth:"430px",
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"22px",
padding:"35px",
boxSizing:"border-box"
}}
>

<div
style={{
textAlign:"center",
marginBottom:"30px"
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
color:"#aaa",
marginTop:"10px"
}}
>

تسجيل الدخول إلى حسابك

</p>

</div>

<input

type="email"

placeholder="البريد الإلكتروني"

value={email}

onChange={(e)=>setEmail(e.target.value)}

style={{
width:"100%",
padding:"15px",
marginBottom:"15px",
borderRadius:"12px",
border:"1px solid #333",
background:"#1a1a1a",
color:"#fff",
boxSizing:"border-box"
}}

/>

<input

type="password"

placeholder="كلمة المرور"

value={password}

onChange={(e)=>setPassword(e.target.value)}

style={{
width:"100%",
padding:"15px",
marginBottom:"20px",
borderRadius:"12px",
border:"1px solid #333",
background:"#1a1a1a",
color:"#fff",
boxSizing:"border-box"
}}

/>

<button

onClick={handleLogin}

disabled={loading}

style={{
width:"100%",
padding:"15px",
border:"none",
borderRadius:"12px",
background:"#D4AF37",
color:"#000",
fontWeight:"bold",
fontSize:"16px",
cursor:"pointer"
}}
>

{loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}

</button>

<div
style={{
display:"flex",
justifyContent:"space-between",
marginTop:"20px",
fontSize:"15px"
}}
>

<Link
to="/register"
style={{
color:"#D4AF37",
textDecoration:"none"
}}
>

إنشاء حساب

</Link>

<Link
to="/"
style={{
color:"#999",
textDecoration:"none"
}}
>

العودة

</Link>

</div>

</div>

</div>

);

}