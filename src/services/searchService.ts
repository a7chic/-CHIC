import { getProducts } from "./productService";

export const searchProducts=async(

keyword:string

)=>{

const products:any[]=await getProducts();

return products.filter(item=>

item.title?.toLowerCase().includes(keyword.toLowerCase())

||

item.category?.toLowerCase().includes(keyword.toLowerCase())

||

item.brand?.toLowerCase().includes(keyword.toLowerCase())

||

item.city?.toLowerCase().includes(keyword.toLowerCase())

);

};