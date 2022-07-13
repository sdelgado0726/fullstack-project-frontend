import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import PostContext from '../contexts/PostContext';
import Stack from 'react-bootstrap/Stack'
import NewPost from './NewPost';
import ListGroup from 'react-bootstrap/ListGroup'


function PostList() {

  function postList(posts) {
    if (posts === null) return
      return posts.map((post) =>
        <ListGroup.Item key={post.postId} style={{ padding: '15px', margin: '25px', marginLeft: '3px', textAlign: 'left', paddingBottom: '2px', backgroundColor: '#F5F1E3' }}>
            <div className="d-flex w-100 justify-content-end">
              <small>{post.updatedAt}</small>
            </div>
            <p class="mb-1" style={{paddingLeft: '16px'}}>{post.post}</p>
            <div className="d-flex w-100 justify-content-start">
              <Link to={`/profile/${post.User.userId}`} className="nav-link">{post.User.username}</Link>       
            </div>
        </ListGroup.Item>
      )
  }

  
  return (
    <>
      <div style={{paddingTop: '15px'}}>
        <h1 style={{paddingBottom: '5px'}}>Blabber Feed</h1>
        {NewPost()}
      </div>
      <Stack direction="horizontal" gap={3}>
        <ListGroup className="align-self-start w-75">
          <PostContext.Consumer>
            {({posts}) => (
              postList(posts)
            )}
          </PostContext.Consumer>
        </ListGroup>
        <Outlet />
      </Stack>
    </>
  )
  
}


export default PostList;
