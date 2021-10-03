import './App.css';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/GetPostById/Post';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile/Profile';
import { AuthContext } from './Helpers/AuthContext';
import { useState , useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


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
    
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState}}>
      <Router>
      <div className="navbar">
          
          <nav className="navbar-expand-lg navbar-light bg-blue">
          <ul className="navbar-nav mr-auto">
          
          { !authState.status ? (
            <>
            <li><Link to={"/login"}> Login</Link></li>
            <li> <Link to={"/signup"}>Signup</Link></li>
            </>
          ):(
            <>
              <li><Link to={"/"}> Home Page</Link></li>
              <li><Link to={"/createpost"}> Create A Post</Link></li>
            </>
          )} 
          </ul>
          <div>
                           
              {authState.status && (
                <>
                  <h3>Logged as :
                  {authState.username}
                  </h3> 
                  <button type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={ logout }>
                    Logout
                  </button>
                </>)
              }    
            </div>
            
          </nav>
        </div>
        
        <Switch>
          <Route path="/" exact component = { Home } />
          <Route path="/createpost" exact component = { CreatePost } />
          <Route path="/post/:id" exact component = { Post } />
          <Route path="/signup" exact component = { Signup } />
          <Route path="/login" exact component = { Login } />
          <Route path="*" exact component = { PageNotFound } />
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
