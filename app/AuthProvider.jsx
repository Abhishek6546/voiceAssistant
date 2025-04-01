"use client"
import { api } from '@/convex/_generated/api';
import { useUser } from '@stackframe/stack';
import { useMutation } from 'convex/react';
import React from 'react'
import { useEffect } from "react"
import { useState } from 'react';
import { UserContext } from "./__context/userContext"

function AuthProvider({ children }) {
    const user = useUser();
    const CreateUser = useMutation(api.user.CreateUser);
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        user && CreateNewUser();
    }, [user])

    const CreateNewUser = async () => {
        try {
            const result = await CreateUser({
                name: user?.displayName,
                email: user.primaryEmail
            });
            console.log('CreateUser result:', result);
            setUserData(result);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }
    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

export default AuthProvider