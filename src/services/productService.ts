import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from "firebase/firestore";

import { db } from "../firebase/config";


// إضافة منتج / إعلان
export const addProduct = async (
  data:{
    title:string;
    description:string;
    price:string;
    category:string;
    image?:string;
    ownerId:string;
  }
) => {

  await addDoc(
    collection(db,"products"),
    {
      ...data,
      createdAt:new Date()
    }
  );

};



// جلب جميع المنتجات
export const getProducts = async () => {

  const q = query(
    collection(db,"products"),
    orderBy("createdAt","desc")
  );


  const snapshot = await getDocs(q);


  return snapshot.docs.map(
    item => ({
      id:item.id,
      ...item.data()
    })
  );

};



// حذف منتج
export const deleteProduct = async (
  id:string
) => {

  await deleteDoc(
    doc(db,"products",id)
  );

};



// تحديث منتج
export const updateProduct = async (
  id:string,
  data:object
) => {

  await updateDoc(
    doc(db,"products",id),
    data
  );

};