import React, { useEffect, useState, useContext, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Helpers/AuthContext";
import '../GetPostById/Post.css';
function Post() {

  let {id} = useParams();

  let history = useHistory();

  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const {authState} = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios.get(`http://localhost:3001/comments/${id}`)
        .then((response) => {
            setComments(response.data);
        });
  }, []); 
  
  const addComment = () => {
    if(localStorage.getItem("accessToken")===null){
        alert("login fist");
    }
    //e.preventDefault();
      axios.post("http://localhost:3001/comments", {
          commentBody: newComment,
          PostId: id
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      })
      .then((response) => {
        if (response.data.error) {
            console.log("response.data.error"+response.data.error);
            
          } else 
           {             
                const commentToAdd = { commentBody: newComment, userName: response.data.userName };
                setComments([...comments, commentToAdd]);
                setNewComment("");
          }
      })
      
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${id}`,{
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }  
    })
    .then(() => {
        alert("delete successfully");
        history.push("/");
    });
  };
    return (
        <Fragment>
            <div className="container m-5 align-center">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{postObject.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">
                                    {postObject.postTextMsg}
                                </p>
                                <a href="/#" className="card-link">{postObject.userName}</ a>
                                <img src={postObject.postImage} className="img-fluid" alt="Responsive image" />
                            
                                <div className="form-group shadow-textarea">
                                    <label htmlFor="exampleFormControlTextarea6">Comments : </label>
                                    <textarea 
                                        className="form-control z-depth-1"
                                        id="exampleFormControlTextarea6"
                                        rows="3" placeholder="Write something here..."
                                        value={newComment}
                                        onChange={(event) => {
                                            setNewComment(event.target.value)
                                        }}>
                                    </textarea>
                                </div>
                                <div>
                                    <button className="btn btn-primary" type="submit" onClick={addComment}>Comments</button>
                                    
                                    {authState.username === postObject.userName && (
                                        <button className="btn btn-primary"
                                         type="submit"
                                         onClick={() => {
                                             deletePost(postObject.id);
                                         }}>Supprimer</button>
                                    )}
                                    
                                </div>   
                                <div>
                                    {
                                        comments.map((comment, key) => {
                                        return(
                                            <div>
                                            <div className="m-2" key={key}>
                                                <label>Username : {comment.userName}</label>
                                                 <input className="form-control" disabled={true}  placeholder={comment.commentBody} />
                                            </div>
                                            <label>authuser:{authState.username}</label>
                                                {authState.username === comment.userName && (
                                                        <button onClick = {() => {
                                                            deleteComment(comment.id);
                                                        }}>
                                                            Supprimer
                                                        </button>
                                                    )}
                                            
                                            </div>);
                                        })
                                    }
                                </div> 
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>            
    );
}

export default Post;
