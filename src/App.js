import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PostList from './components/PostList';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import { UserProvider } from './contexts/UserProvider';
import { PostProvider } from './contexts/PostProvider';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import EditUsers from './components/EditUsers';

function App() {


  return (
    <UserProvider>
    <PostProvider>
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> }> 
                  <Route index element={ <PostList /> } />
                  <Route path="/signin" element={ <SignIn /> } />
                  <Route path="/signup" element={ <SignUp /> } />
                  <Route path="/post/new" element={ <NewPost /> } />
                  <Route path="/post/:id" element={ <EditPost /> } />
                  <Route path="/profile/:id" element={ <UserProfile /> } />
                  <Route path="/profile/:id/edit" element={ <EditUsers /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
    </PostProvider>
    </UserProvider>
  );
}

export default App;

