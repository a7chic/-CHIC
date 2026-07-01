import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase/config";

export async function registerUser(

name:string,

email:string,

password:string

){

const result=

await createUserWithEmailAndPassword(

auth,

email,

password

);

await updateProfile(

result.user,

{

displayName:name

}

);

await setDoc(

doc(db,"users",result.user.uid),

{

uid:result.user.uid,

name,

email,

createdAt:serverTimestamp(),

role:"user"

}

);

return result.user;

}

export async function loginUser(

email:string,

password:string

){

const result=

await signInWithEmailAndPassword(

auth,

email,

password

);

return result.user;

}

export async function logoutUser(){

await signOut(auth);

}

export function authListener(callback:any){

return onAuthStateChanged(

auth,

callback

);

}