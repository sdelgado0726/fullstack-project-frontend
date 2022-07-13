import axios from "axios";
import { useEffect, useState } from "react";
import PostContext from "./PostContext";

export const PostProvider = (props) => {

    const [ posts, setPosts ] = useState([]);
    const [ getPostById, setPostbyId ] = useState({});
    const baseUrl = "http://localhost:3000/api/post/";

    useEffect(() => {
        async function fetchData() {
            await getAllPost();
        }
        fetchData();
    }, []);

    function getAllPost() {
        return axios.get(baseUrl).then(response => setPosts(response.data));
    }

    function getPost(postId) {
        return axios.get(baseUrl + postId)
            .then(response => {
                setPostbyId(response.data);
                return new Promise((resolve) => resolve(response.data))
            }        
        );  
    }

    function addPost(post) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}` 
        };
        
        return axios.post(baseUrl, post, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function editPost(post, postId) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}`
        };

        return axios.put(baseUrl + postId, post, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    function deletePost(postId) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myPostToken')}` 
        };

        return axios.delete(baseUrl + postId, { headers: myHeaders })
            .then(response => {
                getAllPost();
                return new Promise(resolve => resolve(response.data));
            }
        );
    }

    return (
        <PostContext.Provider value={{
            posts,
            getPost,
            addPost,
            editPost,
            deletePost,
            getPostById
        }}>
            { props.children }
        </PostContext.Provider>
    )
};