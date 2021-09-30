import './App.css';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/GetPostById/Post';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { AuthContext } from './Helpers/AuthContext';
import { useState , useEffect } from 'react';
import axios from 'axios';


function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/token', 
    {
      headers: {
        accessToken: localStorage.getItem("accessToken")
      },
    }) 
    .then ((response) => {
      if (response.data.error){
        setAuthState(false);
      }
      else{
        setAuthState(true);
      }
    });
    
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
      <div className="">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-blue">
          <ul className="navbar-nav mr-auto">
          <li><Link to={"/"}> Home Page</Link></li>
          <li><Link to={"/createpost"}> Create A Post</Link></li>
          { !authState && (
            <>
            <li><Link to={"/login"}> Login</Link></li>
            <li> <Link to={"/signup"}>Signup</Link></li>
            </>
          )}          
          </ul>
          </nav>
        </div>
        
        <Switch>
          <Route path="/" exact component = { Home } />
          <Route path="/createpost" exact component = { CreatePost } />
          <Route path="/post/:id" exact component = { Post } />
          <Route path="/signup" exact component = { Signup } />
          <Route path="/login" exact component = { Login } />
        </Switch>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
