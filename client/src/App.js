import './App.css';
import logo from './images/icon-left-font-monochrome-black.png'
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
import { useHistory } from 'react-router-dom';
import moveToLogin from './pages/Login/Login.js';


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
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
      if (response.data.error){
        setAuthState({ ...authState, status: false });
      }
      else{
        
        setAuthState({
          username: response.data.userName,
          id: response.data.id,
          status: true,
        });
      }
    });    
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.href = moveToLogin;
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState}}>
      <Router>
        <nav className="col navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <img src={logo} className="logo_display logo_shadow img-fluid" alt="Info Logo" />
            <h1 className="logo_title">&nbsp;&nbsp;Spécialisée dans la grande distribution&nbsp;&nbsp;</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" className="collapse navbar-collapse link_display">
              <ul className="navbar-nav navbar_override">
                { !authState.status ? (
                    <>
                    <li className="nav-item active"><Link to={"/login"} className="nav-link"> Login</Link></li>
                    <li className="nav-item"> <Link to={"/signup"} className="nav-link">Signup</Link></li>
                    </>
                  ):(
                    <>
                      <li className="nav-item"><Link to={"/"} className="nav-link"> Home Page</Link></li>
                      <li className="nav-item"><Link to={"/createpost"} className="nav-link"> Create A Post</Link></li>
                    </>
                  )} 
                </ul>
            </div>
            <div className="ms-auto">
                            
                {authState.status && (
                  <>
                    <h3>Logged as :
                    {authState.username}
                    </h3> 
                    <button type="button"
                      className="btn btn-sm logout_button"
                      onClick={ logout }>
                      Logout
                    </button>
                  </>)
                }    
              </div>
          </div>
        </nav>    
                     
        <Switch>
          <Route path="/" exact component = { Home } />
          <Route path="/createpost" exact component = { CreatePost } />
          <Route path="/post/:id" exact component = { Post } />
          <Route path="/signup" exact component = { Signup } />
          <Route path="/login" exact component = { Login } />
          <Route path="/profile/:id" exact component = { Profile } />
          <Route path="/changepassword" exact component = { ChangePassword } />
          <Route path="*" exact component = { PageNotFound } />
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
