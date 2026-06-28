import { getProducts } from "./productService";

export async function searchProducts(keyword:string){

const products:any[]=await getProducts();

const value=keyword.trim().toLowerCase();

if(!value) return products;

return products.filter(item=>

item.title?.toLowerCase().includes(value)

||

item.description?.toLowerCase().includes(value)

||

item.category?.toLowerCase().includes(value)

||

item.brand?.toLowerCase().includes(value)

||

item.city?.toLowerCase().includes(value)

);

}