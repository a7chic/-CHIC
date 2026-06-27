import React, { useState } from "react";
import { storage } from "../firebase/config";
import {
ref,
uploadBytes,
getDownloadURL
} from "firebase/storage";


interface Props{

onUpload:(url:string)=>void;

}



export default function ImageUpload({
onUpload
}:Props){


const [loading,setLoading]=useState(false);



const uploadImage = async(
e:React.ChangeEvent<HTMLInputElement>
)=>{


const file=e.target.files?.[0];


if(!file) return;


try{


setLoading(true);


const imageRef = ref(
storage,
`products/${Date.now()}-${file.name}`
);



await uploadBytes(
imageRef,
file
);



const url = await getDownloadURL(
imageRef
);



onUpload(url);


setLoading(false);


}catch(error){


setLoading(false);


alert("فشل رفع الصورة");


}


};



return(

<div>

<input
type="file"
accept="image/*"
onChange={uploadImage}
style={{
color:"#fff"
}}
/>


{loading &&

<p
style={{
color:"#D4AF37"
}}
>

جاري رفع الصورة...

</p>

}


</div>

);

}