import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

export default function ModeratorRoute({children}:any){

const role=useRole();

if(

role!=="moderator" &&

role!=="admin" &&

role!=="owner"

){

return <Navigate to="/home"/>;

}

return children;

}