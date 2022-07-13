import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then(() => {
            navigate('/');
            window.location.reload(true);
        }).catch(error => {
            console.log(error);
            window.alert('Failed login');
        });
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1 style={{paddingTop: '30px', paddingBottom: '15px'}}>LOGIN</h1>
            <span style={{paddingRight: '10px'}}>Username  </span>
            <input placeholder="Enter username" type="text" name="username" onChange={e => setUsername(e.target.value)} />
            <br></br><br></br>
            <span style={{paddingRight: '14px'}}>Password  </span>
            <input placeholder="Enter password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <Button type='submit' style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px', marginTop: '15px'}}>
                Sign In
            </Button>
        </form>
        <div style={{paddingBottom:'392px'}}>

        </div>
        </>
    );
};

export default SignIn;