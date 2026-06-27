import RoyalButton from "../components/RoyalButton";

export default function Login(){

return(

<div
style={{
maxWidth:"550px",
margin:"40px auto",
background:"#111",
padding:"30px",
borderRadius:"20px",
border:"1px solid #d4af37"
}}
>

<h1
style={{
textAlign:"center",
color:"#d4af37",
marginBottom:"25px"
}}
>

بوابة الدخول

</h1>

<input
placeholder="البريد الإلكتروني"
style={{
width:"100%",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}
/>

<input
type="password"
placeholder="كلمة المرور"
style={{
width:"100%",
padding:"15px",
marginBottom:"20px",
borderRadius:"10px"
}}
/>

<RoyalButton title="تسجيل الدخول"/>

</div>

);

}