import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

export default function Register(){

const navigate=useNavigate();

const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");
const [loading,setLoading]=useState(false);

const handleRegister=async()=>{

if(!name||!email||!password||!confirmPassword){

alert("يرجى تعبئة جميع الحقول");

return;

}

if(password!==confirmPassword){

alert("كلمتا المرور غير متطابقتين");

return;

}

if(password.length<6){

alert("كلمة المرور يجب ألا تقل عن 6 أحرف");

return;

}

try{

setLoading(true);

await registerUser(

name.trim(),

email.trim(),

password

);

alert("تم إنشاء الحساب بنجاح");

navigate("/home");

}catch{

alert("تعذر إنشاء الحساب");

}finally{

setLoading(false);

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
padding:"20px"
}}
>

<div
style={{
width:"100%",
maxWidth:"450px",
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
color:"#D4AF37"
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

إنشاء حساب جديد

</p>

</div>

<input
placeholder="الاسم الكامل"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
width:"100%",
padding:"15px",
marginBottom:"15px",
borderRadius:"12px",
background:"#1b1b1b",
border:"1px solid #333",
color:"#fff",
boxSizing:"border-box"
}}
/>

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
background:"#1b1b1b",
border:"1px solid #333",
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
marginBottom:"15px",
borderRadius:"12px",
background:"#1b1b1b",
border:"1px solid #333",
color:"#fff",
boxSizing:"border-box"
}}
/>

<input
type="password"
placeholder="تأكيد كلمة المرور"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
style={{
width:"100%",
padding:"15px",
marginBottom:"20px",
borderRadius:"12px",
background:"#1b1b1b",
border:"1px solid #333",
color:"#fff",
boxSizing:"border-box"
}}
/>

<button
onClick={handleRegister}
disabled={loading}
style={{
width:"100%",
padding:"15px",
background:"#D4AF37",
color:"#000",
border:"none",
borderRadius:"12px",
fontWeight:"bold",
fontSize:"16px",
cursor:"pointer"
}}
>

{loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}

</button>

<div
style={{
marginTop:"25px",
textAlign:"center"
}}
>

<span
style={{
color:"#aaa"
}}
>

لديك حساب بالفعل؟

</span>

<Link
to="/login"
style={{
marginRight:"8px",
color:"#D4AF37",
textDecoration:"none",
fontWeight:"bold"
}}
>

تسجيل الدخول

</Link>

</div>

</div>

</div>

);

}