export interface User{

id:string;

name:string;

email:string;

phone?:string;

image?:string;

role:string;

createdAt?:any;

}

export interface Product{

id:string;

title:string;

description:string;

price:number|string;

category:string;

brand?:string;

city?:string;

condition?:string;

image:string;

ownerId:string;

featured?:boolean;

verified?:boolean;

views?:number;

likes?:number;

status?:string;

createdAt?:any;

}

export interface Message{

id:string;

chatId:string;

senderId:string;

text:string;

createdAt?:any;

}

export interface Notification{

id:string;

userId:string;

title:string;

message:string;

read:boolean;

createdAt?:any;

}