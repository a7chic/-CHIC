import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

export default function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

const [loginType,setLoginType] = useState<
"owner" | "admin" | "user"
>("user");


const handleLogin = async()=>{

if(!email || !password){

alert("يرجى إدخال البريد الإلكتروني وكلمة المرور");

return;

}

try{

setLoading(true);

await loginUser(
email.trim(),
password
);


// دخول صاحب الموقع
if(loginType==="owner"){

navigate("/admin");

return;

}


// دخول المشرف
if(loginType==="admin"){

navigate("/admin");

return;

}


// دخول المستخدم
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
width:"100%",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#050505",
padding:"20px",
boxSizing:"border-box"
}}
>

<div
style={{
width:"100%",
maxWidth:"430px",
background:"linear-gradient(145deg,#111,#050505)",
border:"2px solid #D4AF37",
borderRadius:"28px",
padding:"30px",
boxShadow:"0 0 35px rgba(212,175,55,.25)"
}}
>


<div
style={{
textAlign:"center",
marginBottom:"25px"
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
marginTop:"12px"
}}
>
تسجيل الدخول إلى حسابك
</p>

</div>


<div
style={{
display:"grid",
gap:"12px",
marginBottom:"25px"
}}
>


<button

onClick={()=>setLoginType("owner")}

style={{
padding:"15px",
borderRadius:"15px",
cursor:"pointer",
fontWeight:"bold",
color:"#fff",
background:"#111",
border:
loginType==="owner"
?
"2px solid #D4AF37"
:
"1px solid #333"
}}
>

👑 صاحب الموقع

<span
style={{
display:"block",
fontSize:"12px",
color:"#aaa",
marginTop:"5px"
}}
>
دخول الإدارة العليا
</span>

</button>



<button

onClick={()=>setLoginType("admin")}

style={{
padding:"15px",
borderRadius:"15px",
cursor:"pointer",
fontWeight:"bold",
color:"#fff",
background:"#111",
border:
loginType==="admin"
?
"2px solid #D4AF37"
:
"1px solid #333"
}}
>

🛡️ المشرفون

<span
style={{
display:"block",
fontSize:"12px",
color:"#aaa",
marginTop:"5px"
}}
>
فريق إدارة ANAQA CHIC
</span>

</button>


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



<div
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
background:"#111",
border:"1px solid #333",
padding:"12px",
borderRadius:"12px",
marginBottom:"20px"
}}
>

<div
style={{
color:"#fff",
fontSize:"14px"
}}
>

🔴 وضع التخفي

</div>


<input

type="checkbox"

style={{
width:"20px",
height:"20px",
accentColor:"#D4AF37"
}}

/>


</div>



<button

onClick={handleLogin}

disabled={loading}

style={{
width:"100%",
padding:"16px",
border:"none",
borderRadius:"14px",
background:"#D4AF37",
color:"#000",
fontWeight:"bold",
fontSize:"17px",
cursor:"pointer"
}}

>

{

loading

?

"جاري تسجيل الدخول..."

:

"دخول ANAQA CHIC"

}

</button>



<div
style={{
marginTop:"25px",
textAlign:"center",
display:"flex",
justifyContent:"space-between"
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