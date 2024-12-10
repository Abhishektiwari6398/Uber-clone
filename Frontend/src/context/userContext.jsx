import React from 'react'
import { createContext } from 'react'
export const UserDataContext = createContext

const userContext = ({ children }) => {

    const [User, setUser] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })
    return (
        <div>
            <UserDataContext.Provider value={[User, setUser]}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default userContext