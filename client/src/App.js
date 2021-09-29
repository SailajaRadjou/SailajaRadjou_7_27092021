import './App.css';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home/Home';
import CreatePost from './pages/CreatePost/CreatePost';
import Post from './pages/GetPostById/Post';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';


function App() {
  
  return (
    <div className="App">
      <Router>
      <div className="navbar">
          
          <nav className="navbar-expand-lg navbar-light bg-blue">
          <ul className="navbar-nav mr-auto">
          <li><Link to={"/"}> Home Page</Link></li>
          <li><Link to={"/createpost"}> Create A Post</Link></li>
          <li><Link to={"/login"}> Login</Link></li>
          <li> <Link to={"/signup"}>Signup</Link></li>
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
    </div>
  );
}

export default App;
