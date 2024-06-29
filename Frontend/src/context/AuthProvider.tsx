import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { NullUser, User } from "../api/types";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  AuthLogin: () => void;
  AuthLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(NullUser);


  function decodeAndSetUser() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decodedUser: User = jwtDecode(token);
      setUser(decodedUser);
    }
  }

  useEffect(() => {
    decodeAndSetUser();
  }, []);

  const AuthLogin = () => {
    decodeAndSetUser();
  };

  const AuthLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(NullUser);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, AuthLogin, AuthLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
