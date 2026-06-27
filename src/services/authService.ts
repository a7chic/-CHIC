import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";

import { auth } from "../firebase/config";


// إنشاء حساب جديد
export const registerUser = async (
  email: string,
  password: string
) => {

  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;

};



// تسجيل الدخول
export const loginUser = async (
  email: string,
  password: string
) => {

  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;

};



// تسجيل الخروج
export const logoutUser = async () => {

  await signOut(auth);

};



// مراقبة حالة المستخدم
export const watchAuthState = (
  callback:(user:User|null)=>void
) => {

  return onAuthStateChanged(
    auth,
    callback
  );

};