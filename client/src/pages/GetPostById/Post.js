import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../GetPostById/Post.css';
function Post() {
  let {id} = useParams();
  const [PostObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
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
      axios.post("http://localhost:3001/comments", {
          commentBody: newComment,
          PostId: id
      },
      {
          headers: {
              accessToken: sessionStorage.getItem("accessToken")
          }
      })
      .then((response) => {
          if (response.data.error) {
              console.log(response.data.error);
          } else {
                const commentToBeAdded = { commentBody: newComment };
                setComments([...comments, commentToBeAdded]);
                setNewComment(""); 
          }
         
      });
  };

    return (
        <Fragment>
            <div className="container m-5 align-center">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{PostObject.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p className="card-text">
                                    {PostObject.postTextMsg}
                                </p>
                                <a href="/#" className="card-link">{PostObject.userName}</ a>
                            
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
                                    <button className="btn btn-primary" type="submit">Like</button>
                                </div>   
                                <div>
                                    {
                                        comments.map((comment, key) => {
                                        return(
                                            <div className="m-2" key={key}>
                                                 <input className="form-control" disabled={true}  placeholder={comment.commentBody} />
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
