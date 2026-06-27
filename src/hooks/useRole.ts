import { useEffect,useState } from "react";

export default function useRole(){

const [role,setRole]=useState("visitor");

useEffect(()=>{

const r=localStorage.getItem("role");

if(r){

setRole(r);

}

},[]);

return role;

}