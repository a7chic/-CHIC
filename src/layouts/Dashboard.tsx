import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Login from "../pages/Login";

export default function Dashboard(){

return(

<div
style={{
display:"grid",
gridTemplateColumns:"260px 1fr",
height:"100vh",
background:"#050505"
}}
>

<Sidebar/>

<div
style={{
display:"flex",
flexDirection:"column",
height:"100%"
}}
>

<Header/>

<div
style={{
flex:1,
padding:"20px",
overflow:"hidden"
}}
>

<Login/>

</div>

</div>

</div>

);

}