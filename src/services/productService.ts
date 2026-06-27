import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  increment
} from "firebase/firestore";

import { db } from "../firebase/config";



// إضافة إعلان جديد
export const addProduct = async (
  data:{
    title:string;
    description:string;
    price:string;
    category:string;
    image?:string;
    ownerId:string;
    city?:string;
    brand?:string;
    condition?:string;
  }
) => {

  await addDoc(
    collection(db,"products"),
    {
      ...data,
      likes:0,
      views:0,
      sold:false,
      featured:false,
      verified:false,
      createdAt:new Date()
    }
  );

};



// جلب جميع الإعلانات
export const getProducts = async () => {

  const q = query(
    collection(db,"products"),
    orderBy("createdAt","desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(item=>({

    id:item.id,

    ...item.data()

  }));

};



// تحديث إعلان
export const updateProduct = async (

  id:string,

  data:object

)=>{

  await updateDoc(

    doc(db,"products",id),

    data

  );

};



// حذف إعلان
export const deleteProduct = async (

  id:string

)=>{

  await deleteDoc(

    doc(db,"products",id)

  );

};



// زيادة عدد المشاهدات
export const increaseViews = async (

  id:string

)=>{

  await updateDoc(

    doc(db,"products",id),

    {

      views:increment(1)

    }

  );

};



// زيادة الإعجابات
export const increaseLikes = async (

  id:string

)=>{

  await updateDoc(

    doc(db,"products",id),

    {

      likes:increment(1)

    }

  );

};



// جعل الإعلان مباع
export const markAsSold = async (

  id:string

)=>{

  await updateDoc(

    doc(db,"products",id),

    {

      sold:true

    }

  );

};



// تمييز الإعلان
export const featureProduct = async (

  id:string

)=>{

  await updateDoc(

    doc(db,"products",id),

    {

      featured:true

    }

  );

};



// توثيق الإعلان
export const verifyProduct = async (

  id:string

)=>{

  await updateDoc(

    doc(db,"products",id),

    {

      verified:true

    }

  );

};