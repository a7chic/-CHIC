import React, { useState } from "react";
import { addProduct } from "../services/productService";
import ImageUpload from "../components/ImageUpload";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


export default function AddProduct(){


const navigate = useNavigate();


const [title,setTitle]=useState("");

const [description,setDescription]=useState("");

const [price,setPrice]=useState("");

const [category,setCategory]=useState("");

const [image,setImage]=useState("");



const saveProduct = async()=>{


await addProduct({

title,

description,

price,

category,

image,

ownerId:"guest"

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

➕ إضافة إعلان جديد

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
height:"120px",
padding:"15px",
borderRadius:"10px",
background:"#111",
color:"#fff"
}}
/>



<h3
style={{
color:"#D4AF37"
}}
>

صورة المنتج

</h3>



<ImageUpload
onUpload={setImage}
/>



<div
style={{
marginTop:"20px"
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