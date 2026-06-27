import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/config";

export default function useAuth() {

const [user,setUser]=useState<User|null>(null);

const [loading,setLoading]=useState(true);

useEffect(()=>{

const unsubscribe=onAuthStateChanged(auth,(current)=>{

setUser(current);

setLoading(false);

});

return ()=>unsubscribe();

},[]);

return{

user,

loading,

isLoggedIn:!!user

};

}