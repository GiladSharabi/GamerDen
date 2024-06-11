import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { User } from "../api/types";
import { getUser, logout } from "../api/api.endpoints";

interface AuthContextType {
  user: User | null;
  AuthLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userResult = await getUser(token);
        setUser(userResult);
      }
    };
    authenticateUser();
  }, []);

  // login

  const AuthLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, AuthLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
