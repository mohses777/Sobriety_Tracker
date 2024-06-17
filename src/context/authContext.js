import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import PulseLoader from "react-spinners/PulseLoader";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
    if (loading) {
      return (
        <div className="spinner">
          <PulseLoader color={"#1945B7"} loading={loading} size={10} />
        </div>
      );
    }
  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};