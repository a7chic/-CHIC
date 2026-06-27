import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addProduct } from "../services/productService";
import ImageUpload from "../components/ImageUpload";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

export default function AddProduct() {

const navigate = useNavigate();

const { user } = useAuth();

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [price,setPrice] = useState("");
const [category,setCategory] = useState("");
const [city,setCity] = useState("");
const [brand,setBrand] = useState("");
const [condition,setCondition] = useState("");
const [image,setImage] = useState("");

const saveProduct = async()=>{

if(!user){

alert("يجب تسجيل الدخول");

return;

}

if(
!title ||
!price ||
!category
){

alert("يرجى تعبئة الحقول المطلوبة");

return;

}

await addProduct({

title,

description,

price,

category,

city,

brand,

condition,

image,

ownerId:user.uid

});

alert("تم نشر الإعلان بنجاح");

navigate("/haraj");

};

return(

<div
style={{
maxWidth:"700px",
margin:"0 auto",
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
color:"#D4AF37",
marginBottom:"25px"
}}
>

➕ إضافة إعلان جديد

</h1>

<InputField
label="اسم المنتج"
value={title}
onChange={setTitle}
/>

<InputField
label="السعر (ريال)"
value={price}
onChange={setPrice}
/>

<InputField
label="التصنيف"
value={category}
onChange={setCategory}
/>

<InputField
label="المدينة"
value={city}
onChange={setCity}
/>

<InputField
label="الماركة"
value={brand}
onChange={setBrand}
/>

<InputField
label="حالة المنتج"
value={condition}
onChange={setCondition}
/>

<label
style={{
display:"block",
marginBottom:"10px",
color:"#D4AF37",
fontWeight:"bold"
}}
>

وصف الإعلان

</label>

<textarea
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="اكتب وصفاً واضحاً للمنتج..."
style={{
width:"100%",
height:"140px",
padding:"15px",
background:"#111",
color:"#fff",
border:"1px solid #333",
borderRadius:"10px",
resize:"vertical"
}}
/>

<div
style={{
marginTop:"20px",
marginBottom:"20px"
}}
>

<h3
style={{
color:"#D4AF37"
}}
>

📸 صورة المنتج

</h3>

<ImageUpload
onUpload={setImage}
/>

</div>

<Button
text="🚀 نشر الإعلان"
onClick={saveProduct}
/>

</div>

</div>

);

}