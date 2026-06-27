import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getUserProfile } from "../services/userService";


interface Props{
children:React.ReactNode;
}


export default function ProtectedAdminRoute({
children
}:Props){


const {user,loading}=useAuth();



const [isAdmin,setIsAdmin]=React.useState(false);

const [checking,setChecking]=React.useState(true);



React.useEffect(()=>{


const checkAdmin = async()=>{


if(!user){

setChecking(false);

return;

}



const profile:any = await getUserProfile(
user.uid
);



setIsAdmin(
profile?.role==="admin"
);



setChecking(false);


};



checkAdmin();


},[user]);




if(loading || checking){

return(

<div
style={{
minHeight:"100vh",
background:"#050505",
color:"#D4AF37",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

جاري التحقق...

</div>

);

}



if(!isAdmin){

return <Navigate to="/home"/>;

}



return <>{children}</>;

}