import {
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "../firebase/config";


// إنشاء ملف مستخدم
export const createUserProfile = async (
  uid:string,
  data:{
    name?:string;
    email:string;
    phone?:string;
    role?:string;
  }
) => {

  await setDoc(
    doc(db,"users",uid),
    {
      ...data,
      createdAt:new Date()
    }
  );

};



// جلب بيانات المستخدم
export const getUserProfile = async (
  uid:string
) => {

  const snapshot = await getDoc(
    doc(db,"users",uid)
  );


  if(snapshot.exists()){

    return snapshot.data();

  }


  return null;

};



// تحديث بيانات المستخدم
export const updateUserProfile = async (
  uid:string,
  data:object
) => {

  await updateDoc(
    doc(db,"users",uid),
    data
  );

};