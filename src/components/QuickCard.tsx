interface Props{

title:string;

icon:string;

}

export default function QuickCard({

title,

icon

}:Props){

return(

<div

style={{

background:"#111",

border:"1px solid #D4AF37",

borderRadius:"16px",

padding:"25px",

textAlign:"center",

cursor:"pointer",

transition:"0.3s"

}}

>

<div

style={{

fontSize:45,

marginBottom:15

}}

>

{icon}

</div>

<div

style={{

fontWeight:"bold",

fontSize:18

}}

>

{title}

</div>

</div>

);

}