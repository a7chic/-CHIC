import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

interface Props{
children:any;
}

export default function PrivateRoute({children}:Props){

const {loading,isLoggedIn}=useAuth();

if(loading){

return <Loading/>;

}

if(!isLoggedIn){

return <Navigate to="/"/>;

}

return children;

}