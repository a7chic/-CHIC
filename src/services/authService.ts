import {
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
signOut
} from "firebase/auth";

import { auth } from "../firebase/config";

export const authService={

login(email:string,password:string){

return signInWithEmailAndPassword(auth,email,password);

},

register(email:string,password:string){

return createUserWithEmailAndPassword(auth,email,password);

},

logout(){

return signOut(auth);

}

};