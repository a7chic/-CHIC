import { useState } from "react"; export default function useAuth() { const [user] = useState({ uid: "user_123" }); return { user }; }
