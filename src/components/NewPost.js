import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import { Button } from 'react-bootstrap';

const NewPost = () => {

    let [ newPost, setNewPost ] = useState({
        post: "",
    });

    let [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let { addPost, getPost } = useContext(PostContext);
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        async function fetch() {
          await getPost(params.id)
            .then((user) => setUser(user));
            } 
            fetch();
    
            let storage = localStorage.getItem("myPostToken");
    
            if (storage === null) {
            setIsLoggedIn(false);
            } else {
            setIsLoggedIn(true);
            }
        }, [params.id, isLoggedIn, setUser]);


    function handleChange(event) {
        setNewPost((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        addPost(newPost).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    function authUser() {
        if (isLoggedIn) {
            return <div>
            <form onSubmit={handleSubmit}>
                <textarea placeholder="Enter New Blab" type="text" name="post" rows={3} cols={50} value={newPost.post} onChange={handleChange} />
                <br></br><br></br>
                <Button type='submit' style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px'}}>Blab Away</Button>
            </form>
            </div>  
        } else {
            return null;
        }
    }
    

    return (

        <div>
            {authUser()}
        </div>
                
    )
    

    
};

export default NewPost;

