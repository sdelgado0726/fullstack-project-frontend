import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [state, setState] = useState("");

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createUser(username, password, firstName, lastName, state).then(() => {
            navigate('/signin');
        }).catch(error => {
            console.log(error);
            window.alert('Failed registration: error creating user');
        });
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <h1 style={{paddingTop: '30px', paddingBottom: '15px'}}>REGISTER</h1>
            <span style={{paddingRight: '14px'}}>Username  </span>
            <input placeholder="Enter Email" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            <br></br><br></br>
            <span style={{paddingRight: '18px'}}>Password  </span>
            <input placeholder="Enter Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <span style={{paddingRight: '10px'}}>First Name  </span>
            <input placeholder="Enter First Name" type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <br /><br></br>
            <span style={{paddingRight: '10px'}}>Last Name  </span>
            <input placeholder="Enter Last Name" type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
            <br /><br></br>
            <span style={{paddingRight: '50px'}}>State  </span>
            <input placeholder="Enter State" type="text" name="state" value={state} onChange={e => setState(e.target.value)} />
            <br /><br></br>
            <Button type='submit' style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px', marginTop: '15px'}}>Sign Up</Button>
        </form>
        <div style={{paddingBottom:'230px'}}>

        </div>
        </>
    )
};

export default SignUp;