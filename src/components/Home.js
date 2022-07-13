import { Outlet, Link, useParams, useNavigate } from "react-router-dom";
import { Stack, Container, Nav, Navbar } from "react-bootstrap";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import "./Home.css";

function Home() {
  let { getUserProfile } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let params = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      await getUserProfile(params.id)
        .then((user) => setCurrentUser(user));
        
        } 
        fetch();

        let storage = localStorage.getItem("myPostToken");

        if (storage === null) {
        setIsLoggedIn(false);
        } else {
        setIsLoggedIn(true);
        }
    }, [params.id, isLoggedIn, currentUser]);


  const logOut = () => {
    localStorage.clear();
    navigate('/signin')
    window.location.reload(true);
    return
  };

  

  const renderNav = () => {

        if (isLoggedIn) {

        return (
            <Nav> 
                <Link to={'/profile/:userId'} className="nav-link">
                  Profile
                </Link>
                <Link to="/" className="nav-link" onClick={logOut}>
                    Sign Out
                </Link>
            </Nav>
        );
        } else {
        
        return (
            <Nav>
                <Link to="/signup" className="nav-link">Sign Up</Link>
                <Link to="/signin" className="nav-link" onClick={isLoggedIn}>Sign In</Link>
            </Nav>
        );
        }
    };



  return (
    <>
      <Navbar className="Navbar">
        <Navbar.Brand className="logo">
            <img
              alt=""
              src={"https://mir-s3-cdn-cf.behance.net/projects/404/bb931455379241.Y3JvcCwxOTk5LDE1NjQsMCw0.png"}
              width="45"
              height="45"
              style={{ padding: "5px" }}
            />{" "}
            Blabber
          </Navbar.Brand>
        <Container className="justify-content-end">
          <Nav>
            {/* <Link to="/signup" className="nav-link">
              Sign Up
            </Link> */}
            { renderNav()}
            <Link to="/" className="nav-link">
              All Posts
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Stack gap={3} className="col-md-10 mx-auto">
        <Outlet />
      </Stack>
      <footer
        style={{ backgroundColor: "#000807", color: "#A2A3BB" }}
        className="footer"
      >
        <div className="footer-copyright text-center py-3">
          © 2022 Blabber • Website Design by Stephanie Delgado
        </div>
      </footer>
    </>
    
  );
}

export default Home;
