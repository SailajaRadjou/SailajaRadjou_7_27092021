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
        <div className="navbar navbar-expand-lg navbar-light">
          <Link to="/"> Home Page</Link>
          <Link to="/createpost"> Create A Post</Link>
          <Link to="/login"> Login</Link>
          <Link to="/registration">Signup</Link>
        </div>
        
        <Switch>
          <Route path="/" exact component = { Home } />
          <Route path="/createpost" exact component = { CreatePost } />
          <Route path="/post/:id" exact component = { Post } />
          <Route path="/registration" exact component = { Signup } />
          <Route path="/login" exact component = { Login } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
