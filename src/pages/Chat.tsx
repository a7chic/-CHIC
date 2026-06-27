import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
getMessages,
sendMessage
} from "../services/chatService";

import useAuth from "../hooks/useAuth";


export default function Chat(){


const {id}=useParams();

const {user}=useAuth();


const [messages,setMessages]=useState<any[]>([]);

const [text,setText]=useState("");



useEffect(()=>{


if(!id)return;


const load=async()=>{


const data=
await getMessages(id);


setMessages(data);


};



load();


},[id]);





const send=async()=>{


if(!text || !user || !id)
return;



await sendMessage(
id,
user.uid,
text
);



setText("");



const data=
await getMessages(id);


setMessages(data);


};



return(

<div
style={{
color:"#fff"
}}
>


<h1
style={{
color:"#D4AF37"
}}
>

💬 المحادثة

</h1>



<div
style={{
background:"#111",
border:"1px solid #D4AF37",
borderRadius:"18px",
padding:"20px",
minHeight:"400px"
}}
>


{
messages.map(
(message)=>(


<div
key={message.id}
style={{
background:
message.senderId===user?.uid
?"#D4AF37"
:"#222",
color:
message.senderId===user?.uid
?"#000"
:"#fff",
padding:"12px",
borderRadius:"12px",
marginBottom:"10px"
}}
>

{message.text}

</div>


)

)
}



</div>




<div
style={{
display:"flex",
gap:"10px",
marginTop:"15px"
}}
>


<input

value={text}

onChange={(e)=>setText(e.target.value)}

placeholder="اكتب رسالة..."

style={{
flex:1,
padding:"14px",
borderRadius:"10px",
background:"#111",
color:"#fff",
border:"1px solid #333"
}}

/>



<button

onClick={send}

style={{
background:"#D4AF37",
border:"none",
borderRadius:"10px",
padding:"0 25px",
fontWeight:"bold"
}}

>

إرسال

</button>


</div>


</div>

);

}