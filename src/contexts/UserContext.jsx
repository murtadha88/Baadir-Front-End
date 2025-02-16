import { createContext, useState }  from 'react' 

const UserContext = createContext()

const getUserFromToken = () => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role');
    if (!token) return null

    const name = JSON.parse(atob(token.split('.')[1])).payload;

    const user = {
        name: name,
        role: role,
    }

    return user;
}



function UserProvider({ children }) {

    const [user, setUser] = useState(getUserFromToken())

    const value = { user, setUser }

    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }