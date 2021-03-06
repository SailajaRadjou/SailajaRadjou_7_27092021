import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/GetPostById/Post';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import { AuthContext } from './Helpers/AuthContext';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role:0,
    status: false,
  });

  let history = useHistory();
  
  useEffect(() => {
    axios.get('http://localhost:3001/auth/token', 
    {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      },
    }) 
    .then ((response) => {
      console.log("response.data : "+response.data.userName);
      if (response.data.error){
        setAuthState({ ...authState, status: false });
      }
      else{
        
        setAuthState({
          username: response.data.userName,
          id: response.data.id,
          role:response.data.role,
          status: true,
        });
        console.log("authstate appjs : "+JSON.stringify(authState));
      }
    });    
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, role:0, status: false });
    window.location.href="/login";
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState}}>
      <Router>
        <Navbar bg="light" variant={"light"} expand="lg">
          <Navbar.Brand>
            Groupomania  --  Réseau social d'entreprise&nbsp;&nbsp;
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="my-2 my-lg-0" navbarScroll>
              { !authState.status ? (
                <>
                  <Nav.Link as={Link} to={"/login"} className="navlink">Login</Nav.Link>
                  <Nav.Link as={Link} to={"/signup"}>Signup</Nav.Link>
                </>
                ):(
                <>
                  <Nav.Link as={Link} to={"/"}>Home Page</Nav.Link>
                  <Nav.Link as={Link} to={"/createpost"}>Create A Post</Nav.Link>
                </>
              )}  
              <div className="ms-auto">
                {authState.status && (
                  <div className="logger_container">
                    <h4>Logged as : {authState.username}</h4> 
                    <button type="button" className="btn btn-sm logout_button" onClick={ logout }>
                      Logout
                    </button>
                  </div>)
                }    
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component = { Home } />
          <Route path="/createpost" component = { CreatePost } />
          <Route path="/post/:id" component = { Post } />
          <Route path="/signup" component = { Signup } />
          <Route path="/login" component = { Login } />
          <Route path="/profile/:id" component = { Profile } />
          <Route path="/changepassword" component = { ChangePassword } />
          <Route path="*" component = { PageNotFound } />
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
