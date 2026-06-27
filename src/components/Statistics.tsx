export default function Statistics(){

const data=[

["👥","المستخدمون",0],

["📦","الإعلانات",0],

["💬","التعليقات",0],

["👑","المشرفون",0]

];

return(

<div

style={{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",

gap:20

}}

>

{

data.map(item=>(

<div

key={item[1]}

style={{

background:"#111",

padding:"20px",

borderRadius:"16px",

border:"1px solid #D4AF37",

textAlign:"center"

}}

>

<div style={{fontSize:40}}>{item[0]}</div>

<h3>{item[1]}</h3>

<h1>{item[2]}</h1>

</div>

))

}

</div>

);

}