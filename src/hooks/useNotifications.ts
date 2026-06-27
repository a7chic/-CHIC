import { useState } from "react";

export default function useNotifications(){

const [notifications]=useState([]);

return{

notifications

};

}