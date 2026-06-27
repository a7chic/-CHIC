import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addProduct } from "../services/productService";
import ImageUpload from "../components/ImageUpload";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";


export default function AddProduct(){


const navigate = useNavigate();

const {user}=useAuth();



const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [price,setPrice]=useState("");

const [category,setCategory]=useState("");

const [image,setImage]=useState("");



const saveProduct = async()=>{


if(!user){

alert("يجب تسجيل الدخول أولاً");

return;

}



await addProduct({

title,

description,

price,

category,

image,

ownerId:user.uid

});



navigate("/haraj");


};



return(

<div
style={{
color:"#fff"
}}
>


<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"20px",
padding:"30px"
}}
>


<h1
style={{
color:"#D4AF37"
}}
>

👑 إضافة إعلان جديد

</h1>



<InputField

label="اسم المنتج"

value={title}

onChange={setTitle}

/>



<InputField

label="السعر"

value={price}

onChange={setPrice}

/>



<InputField

label="التصنيف"

value={category}

onChange={setCategory}

/>



<textarea

placeholder="وصف المنتج"

value={description}

onChange={(e)=>setDescription(e.target.value)}

style={{
width:"100%",
height:"130px",
padding:"15px",
borderRadius:"10px",
background:"#111",
color:"#fff",
border:"1px solid #333"
}}

/>



<h3
style={{
color:"#D4AF37"
}}
>

📸 صورة الإعلان

</h3>



<ImageUpload

onUpload={setImage}

/>



<div
style={{
marginTop:"25px"
}}
>

<Button

text="نشر الإعلان"

onClick={saveProduct}

/>

</div>



</div>


</div>

);

}