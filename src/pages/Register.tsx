import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { createUserProfile } from "../services/userService";
import { useNavigate, Link } from "react-router-dom";


export default function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();


const handleRegister = async()=>{

try{

const user = await registerUser(
email,
password
);


await createUserProfile(
user.uid,
{
name,
email,
role:"user"
}
);


navigate("/home");


}catch(error){

alert("حدث خطأ أثناء إنشاء الحساب");

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

إنشاء حساب

</h2>



<input
placeholder="الاسم"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{
width:"100%",
padding:"14px",
margin:"10px 0",
borderRadius:"10px",
border:"none"
}}
/>



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
onClick={handleRegister}
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

إنشاء الحساب

</button>



<p
style={{
marginTop:"20px"
}}
>

لديك حساب؟

<Link
to="/login"
style={{
color:"#D4AF37",
marginRight:"8px"
}}
>

تسجيل الدخول

</Link>


</p>


</div>


</div>

);

}