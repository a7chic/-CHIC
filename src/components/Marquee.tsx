interface Props{

text:string;

background?:string;

color?:string;

}

export default function Marquee({

text,

background="#D4AF37",

color="#000"

}:Props){

return(

<div
style={{

width:"100%",

overflow:"hidden",

background,

color,

padding:"12px",

fontWeight:"bold",

whiteSpace:"nowrap"

}}
>

<div
style={{

display:"inline-block",

paddingLeft:"100%",

animation:"marquee 25s linear infinite"

}}
>

{text}

</div>

<style>

{`

@keyframes marquee{

0%{transform:translateX(0)}

100%{transform:translateX(-100%)}

}

`}

</style>

</div>

);

}