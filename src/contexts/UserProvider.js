import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "./UserContext";

export const UserProvider = (props) => {

    const [ users, setUsers ] = useState([]);
    const [ getUserById, setUserById ] = useState({});
    const baseUrl = "http://localhost:3000/api/users/";

    useEffect(() => {
        async function fetchData() {
            await getAllUsers();
        }
        fetchData();
    }, []);

    function getAllUsers() {
        return axios.get(baseUrl).then(response => setUsers(response.data));
    }

    function createUser(username, password, firstName, lastName, state) {
        let user = { username, password, firstName, lastName, state };
        
        return axios.post(baseUrl, user)
            .then(response => {
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function editUser(users, userId) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.put(baseUrl + userId, users, { headers: myHeaders })
            .then(response => {
                getAllUsers();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function signInUser(username, password) {
        let user = { username, password };

        return axios.post(`${baseUrl}login`, user)
            .then(response => {
                localStorage.setItem('myPostToken', response.data.token)
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function getUserProfile(userId) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}` 
        };
        
        return axios.get(baseUrl + userId, { headers: myHeaders })
            .then(response => {
                setUserById(response.data);
                return new Promise((resolve) => resolve(response.data));
            }
        );
    }


    return (
        <UserContext.Provider value={{
            users,
            createUser,
            signInUser,
            getUserProfile,
            getUserById,
            editUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}