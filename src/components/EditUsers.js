import React, {useContext, useState, useEffect} from "react"
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext";

const EditUsers = () => {
    let {editUser, getUserProfile, getUserById} = useContext(UserContext);
    let params = useParams();
    let navigate = useNavigate();
    let {userId, username, password, firstName, lastName, state} = getUserById;
    // console.log(params)

    let [editThisUser, setEditThisUser] = useState({
        userId: params.userId,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        state: state
    })

    useEffect(() => {
        async function fetch() {
          await getUserProfile(params.id)
            .then((editThisUser) => setEditThisUser(editThisUser))
          }
          fetch()
    },  [params.id])

    function handleChange(event) {
        setEditThisUser((prevValue) => {
            return {...prevValue, [event.target.name]: event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        editUser(editThisUser, userId).then(() => {
            alert('Update is successful!');
            navigate(`/profile/${editThisUser.userId}`);
            window.location.reload(true);
        }).catch(error => {
            console.log(error);
            navigate('/signin');
        });
    }

    return (
        <UserContext.Consumer>
       {
        () => {
            return (
                <>
                <div>
                    <form onSubmit={handleSubmit}>
                        <h1 style={{paddingTop: '30px', paddingBottom: '15px'}}>EDIT USER INFO</h1>
                        <span style={{paddingRight: '14px'}}>Username  </span>
                        <input placeholder="Enter Username" type="text" name="username" value={editThisUser.username} onChange={handleChange} />
                        <br></br><br></br>
                        <span style={{paddingRight: '18px'}}>Password </span>
                        <input placeholder="Enter Password" type="password" name="password" value={editThisUser.password} onChange={handleChange} />
                        <br></br><br></br>
                        <span style={{paddingRight: '10px'}}>First Name  </span>
                        <input placeholder="Enter First Name" type="text" name="firstName" value={editThisUser.firstName} onChange={handleChange} />
                        <br></br><br></br>
                        <span style={{paddingRight: '10px'}}>Last Name  </span>
                        <input placeholder="Enter Last Name" type="text" name="lastName" value={editThisUser.lastName} onChange={handleChange} />
                        <br></br><br></br>
                        <span style={{paddingRight: '50px'}}>State  </span>
                        <input placeholder="Enter State" type="text" name="state" value={editThisUser.state} onChange={handleChange} />
                        <br></br><br></br>
                        <Button type='submit' style={{backgroundColor: '#000807', color: '#A2A3BB', marginBottom: '5px', marginTop: '15px'}}>Edit User</Button>
                    </form>
                </div>
                <div style={{paddingBottom:'230px'}}>

                </div>
                </>

            )
        }
        }
        </UserContext.Consumer>
    )
}

export default EditUsers