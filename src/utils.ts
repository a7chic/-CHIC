export function formatPrice(price:any){

if(price===undefined||price===null) return "0";

return Number(price).toLocaleString("ar-SA");

}

export function formatDate(date:any){

if(!date) return "";

try{

if(date.seconds){

return new Date(date.seconds*1000)

.toLocaleDateString("ar-SA");

}

return new Date(date)

.toLocaleDateString("ar-SA");

}catch{

return "";

}

}

export function shorten(text:string,length=120){

if(!text) return "";

if(text.length<=length) return text;

return text.substring(0,length)+"...";

}

export function generateId(){

return Math.random()

.toString(36)

.substring(2,12);

}

export function capitalize(text:string){

if(!text) return "";

return text.charAt(0).toUpperCase()+text.slice(1);

}