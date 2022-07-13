import React, {useContext, useState, useEffect} from "react"
import PostContext from "../contexts/PostContext"
import { useParams, useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext";
import { Button } from "react-bootstrap";

const EditPost = () => {
    let {editPost, getPost, getPostById } = useContext(PostContext);
    let params = useParams();
    let navigate = useNavigate();
    let {postId, post} = getPostById;
    console.log(params)

    let [editThisPost, setEditThisPost] = useState({
        post: post
    })

    useEffect(() => {
        async function fetch() {
          await getPost(params.id)
            .then((editThisPost) => setEditThisPost(editThisPost))
          }
          fetch()
    },  [params.id])

    function handleChange(event) {
        setEditThisPost((prevValue) => {
            return {...prevValue, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        editPost(editThisPost, postId).then(() => {
            alert('Update is successful!');
            navigate('/');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    

    return (
        <PostContext.Consumer>
       {
        () => {
            return (
                <>
                <div>
                    <form onSubmit={handleSubmit} style={{ padding: '50px', paddingLeft: '5px', paddingRight: '10px', backgroundColor: '#B2ABBF'}}>
                        <textarea type="text" name="post" rows={3} cols={50} value={editThisPost.post} onChange={handleChange} />
                        <br></br><br></br>
                        <Button type='submit' style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px'}}>Update</Button>
                    </form>
                    
                </div>
                <div style={{paddingBottom: '432px'}}>

                </div>
                </>
                
            )
        }
        }
        </PostContext.Consumer>
    )
}

export default EditPost