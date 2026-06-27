import Layout from "../components/Layout";
import {RoyalButton,RoyalCard,RoyalInput} from "../components/UI";

export default function Login(){

return(

<Layout title="بوابة الدخول">

<div
style={{
maxWidth:"700px",
margin:"0 auto"
}}
>

<RoyalCard>

<h1
style={{
textAlign:"center",
color:"#D4AF37",
marginBottom:"30px"
}}
>

🔐 بوابات الدخول

</h1>

<RoyalInput placeholder="البريد الإلكتروني"/>

<RoyalInput
type="password"
placeholder="كلمة المرور"
/>

<div
style={{
display:"grid",
gap:"15px"
}}
>

<RoyalButton title="👑 دخول صاحب الموقع"/>

<RoyalButton title="🛡️ دخول المشرفين"/>

<RoyalButton title="👤 دخول الزوار"/>

</div>

</RoyalCard>

</div>

</Layout>

);

}