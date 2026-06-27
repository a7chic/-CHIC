import { Navigate } from "react-router-dom";
import useOwner from "../hooks/useOwner";

export default function OwnerRoute({children}:any){

const owner=useOwner();

if(!owner){

return <Navigate to="/home"/>;

}

return children;

}