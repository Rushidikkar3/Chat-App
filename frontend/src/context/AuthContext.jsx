
import { createContext, useContext, useState } from "react";
// this is for to use props directly across the overall frontend
export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);        
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
        </AuthContext.Provider>;
    };
