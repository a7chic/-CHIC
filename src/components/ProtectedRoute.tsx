import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


interface Props{
children:React.ReactNode;
}


export default function ProtectedRoute({
children
}:Props){

const {user,loading}=useAuth();


if(loading){

return (

<div
style={{
minHeight:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#050505",
color:"#D4AF37",
fontSize:"25px"
}}
>

جاري التحميل...

</div>

);

}



if(!user){

return <Navigate to="/login"/>;

}



return <>{children}</>;

}