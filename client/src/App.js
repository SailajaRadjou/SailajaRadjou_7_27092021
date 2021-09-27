
import './App.css';
import axios from 'axios';
import { useEffect, useState} from "react";

function App() {
  const [AllPosts, setAllPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts")
      .then((response) => {
        setAllPosts(response.data);
      });
  }, []);
  return (
    <div className="App">
      {AllPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div className="body">{value.postTextMsg}</div>
            <div className="footer">{value.userName}</div>
          </div>  
        );
      })}
    </div>
  );
}

export default App;
