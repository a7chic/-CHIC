import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

export default function AdminRoute({children}:any){

const role=useRole();

if(role!=="admin" && role!=="owner"){

return <Navigate to="/home"/>;

}

return children;

}