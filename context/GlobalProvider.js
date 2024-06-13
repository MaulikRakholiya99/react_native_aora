import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrantUser } from '../lib/appwrite';

const GlobalContext = createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
};
export const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrantUser()
      .then((user) => {
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, isLoggedIn,setIsLoggedIn, loading }}>
      {children}
    </GlobalContext.Provider>
  );
};
