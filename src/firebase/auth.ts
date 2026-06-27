import { auth } from "./config";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
sendEmailVerification
} from "firebase/auth";

export async function register(email:string,password:string){

const user=await createUserWithEmailAndPassword(auth,email,password);

await sendEmailVerification(user.user);

return user;

}

export async function login(email:string,password:string){

return await signInWithEmailAndPassword(auth,email,password);

}

export async function logout(){

return await signOut(auth);

}