import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { NullUser, User } from "../api/types";
import { getUser, logout } from "../api/api.endpoints";

interface AuthContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  AuthLogin: () => void;
  AuthLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(NullUser);

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userResult = await getUser(token);
          setUser(userResult);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    authenticateUser();
  }, []);

  const AuthLogin = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userResult = await getUser(token);
        setUser(userResult);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const AuthLogout = () => {
    logout();
    setUser(NullUser);
  };


  return (
    <AuthContext.Provider value={{ user, setUser, AuthLogin, AuthLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
