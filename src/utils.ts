export function money(price:number){

return new Intl.NumberFormat("ar-SA",{

style:"currency",

currency:"SAR"

}).format(price);

}

export function date(time:number){

return new Date(time).toLocaleDateString("ar-SA");

}