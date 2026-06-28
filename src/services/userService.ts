import {
getStorage,
ref,
uploadBytes,
getDownloadURL,
deleteObject
} from "firebase/storage";

const storage=getStorage();

export async function uploadImage(

file:File,

folder="products"

){

const fileName=

`${folder}/${Date.now()}-${file.name}`;

const storageRef=ref(storage,fileName);

await uploadBytes(storageRef,file);

return await getDownloadURL(storageRef);

}

export async function deleteImage(

url:string

){

try{

const imageRef=ref(storage,url);

await deleteObject(imageRef);

}catch{}

}