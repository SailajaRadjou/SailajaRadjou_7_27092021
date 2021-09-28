import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let {id} = useParams();
  const [postObject, setPostObject] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  });  
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>            
    );
}

export default Post;
