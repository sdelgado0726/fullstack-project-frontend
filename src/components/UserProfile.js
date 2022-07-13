import React, { useContext, useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import UserContext from '../contexts/UserContext';

const UserProfile = () => {

    let { getUserProfile } = useContext(UserContext);
    let { deletePost, posts } = useContext(PostContext);
    let params = useParams();
    let navigate = useNavigate();

    let [getUser, setGetUser] = useState(null)
  
    
    useEffect(() => {
        async function fetch() {
          await getUserProfile(params.id)
            .then((user) => {
                console.log(user)
                setGetUser(user)
            })
          }
          fetch()
    },  [params.id])

    function handleDeletePost(postId) {
        deletePost(postId).then(() => {
            window.location.reload(true);
            navigate('/profile/:id');
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }


    function userData() {
        if (getUser === null) return;
       return <> <div style={{padding: '5px', paddingTop: '20px'}}>
                <h1 style={{paddingBottom: '10px'}}>User Profile: {getUser.username}</h1>
                <h7><strong>Name:</strong></h7> <h7>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getUser.firstName} {getUser.lastName}</h7><br/><br/>
                <h7><strong>Location:</strong></h7> <h7>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getUser.state}</h7><br/><br/>
                <h7><strong>Profile Created:</strong></h7> <h7>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{getUser.createdAt}</h7>     
            </div>
            <div style={{paddingTop: '10px', paddingLeft: '5px'}}>
                <Link to={`/profile/${getUser.userId}/edit`} className="btn btn-primary text me-2" style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px'}}>Edit</Link> 
            </div> </>
    }


    function userPosts() {

        if (getUser === null) return;
        return getUser.Posts.map((data) => 
        <ListGroup.Item key={data.postId} style={{ padding: '15px', margin: '25px', marginLeft: '3px', textAlign: 'left', paddingBottom:'2px', backgroundColor: '#F5F1E3' }}>
                <div className="d-flex w-100 justify-content-end">
                    <small>{data.updatedAt}</small>
                </div>
                <p className="mb-1" style={{paddingLeft: '16px'}}>{data.post}</p>
                <div className="d-flex w-100 justify-content-start">
                    <Link to={`/profile/${getUser.userId}`} className="nav-link">{getUser.username}</Link>
                </div>
                <div className="d-flex w-100 justify-content-end">
                    {getUser.userId === data.userId ? <Link to={`/post/${data.postId}`} className="btn btn-primary text me-2" style={{backgroundColor: '#A2A3BB', color: '#000807', marginBottom: '5px'}}>Edit</Link> : ' '}
                    {getUser.userId === data.userId ? <Button style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px'}} onClick={handleDeletePost.bind(this, data.postId)}>Delete Coffee</Button> : ' '}
                </div>
            </ListGroup.Item>
        )  
        
    }
    

    return (
        <UserContext.Consumer>
       {
        () => {
            return (
                <>
                <div>

                    {userData()}

                </div>
                <div>
                    <h3 style={{paddingLeft: '5px'}}>Blabs</h3>   
                    <ListGroup className="align-self-start w-75">

                        {userPosts()}

                    </ListGroup>          
                </div> 
                <div style={{paddingBottom: '176px'}}>

                </div>
                <Outlet />
                </>
            )
        }
        }
        </UserContext.Consumer>
    ) 
        
};

export default UserProfile;


