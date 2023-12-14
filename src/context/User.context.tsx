// src/contexts/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';



type UserContextType = {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
};
const UserContext = createContext<UserContextType>({
    user: {},
    setUser: () => { },
});

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
