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
      console.log("authstate : "+JSON.stringify(authState));
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
                setComments([...comments, response.data]);
                setNewComment("");
          }
      })
      
  };

  const deleteComment = (cid) => {
    axios
      .delete(`http://localhost:3001/comments/${cid}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
          //The filter() method creates a new array with all elements that pass the test implemented by the provided function.
        setComments(
          comments.filter((val) => {
            return val.id != cid;
          })
        );
      });
  };

  const deletePost = () => {
    var result = window.confirm("Do you want to delete the post?");
    if(result){
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
};
  const editPost = (option) => {
      if(option === "title"){
        let newTitle = prompt("Enter New Title : ");
        axios.put(`http://localhost:3001/posts/title/${id}`,
        {
            newTitle: newTitle,
            id: id,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }   
        });
        setPostObject({ ...postObject, title: newTitle });
      }else{
        let newTextMsg = prompt("Enter New Message : ");
        axios.put(`http://localhost:3001/posts/postText/${id}`,
        {
            newTextMsg: newTextMsg,
            id: id,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }   
        });
        setPostObject({ ...postObject, postTextMsg: newTextMsg });
      }
  }
    return (
        <Fragment>
            <div className="container m-5 align-center">
                <div className="row">
                    <div className="col">
                        <div className="card getOnePoast_display">
                            <div className="card-body">
                               <div onClick={() => {
                                   if((authState.username === postObject.userName)||(authState.role === 1)){
                                       editPost("title");
                                    }
                                    }}>
                                    <h5 className="card-title">{postObject.title}</h5>
                                    <div className="user_container">
                                    <label> Posted by : &nbsp;&nbsp;</label>
                                    <h6 className="card-subtitle mb-2 text-muted">{postObject.userName}</h6>
                                    </div>
                                </div>
                                <div onClick={() => {
                                    if((authState.username === postObject.userName)|| (authState.role === 1)){
                                        editPost("text")
                                    }
                                    }}>
                                    <p className="card-text">{postObject.postTextMsg}</p>
                                </div>
                                {(postObject.postImage!=="") &&
                                        <img src={postObject.postImage} className="img-fluid" alt="No Uploads" />}
                                
                            
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
                                    <button className="btn btn-primary loginButton" type="submit" onClick={addComment}>Comments</button>
                                    
                                    {((authState.username === postObject.userName) || (authState.role === 1)) && (
                                        <button className="btn btn-primary loginButton"
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
                                            <div className="m-2">
                                                <label>Username : {comment.userName}</label>
                                                 <input className="form-control" disabled={true}  placeholder={comment.commentBody} />
                                            </div>
                                            <label>authuser:{authState.username}</label>
                                                {((authState.username === comment.userName) || (authState.role === 1)) && (
                                                        <button className="loginButton" onClick = {() => {
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
