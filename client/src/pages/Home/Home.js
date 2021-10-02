import React, {Fragment} from 'react';
import axios from 'axios';
import { useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';

import '../Home/styles/Home.css';

function Home() {
    const [AllPosts, setAllPosts] = useState([]);
    
    let history = useHistory();


    useEffect(() => {
        axios.get("http://localhost:3001/posts")
        .then((response) => {
            setAllPosts(response.data);
        });
        
    }, []);

    const likeAPost = (postId) => {
        axios.post("http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
        ).then((response) => {
            setAllPosts(AllPosts.map((post) => {
                if(post.id === postId){
                    if(response.data.liked){
                        return{...post, Likes: [...post.Likes, 0] };
                    }
                    else{
                        const likesArray = post.Likes;
                        likesArray.pop();
                        return {...post, Likes: likesArray };
                    }
                }
                else{
                    return post;
                }
            }));
            alert(JSON.stringify(response.data));
        });
    };

    return (
        <Fragment>
            {AllPosts.map((value, key) => {
                return (
                    <div key={key} className="container m-5 align-center">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-body" onDoubleClick={() => {history.push(`/post/${value.id}`)}}>
                                        <h5 className="card-title">{value.title}</h5>
                                        <p className="card-text">{value.postTextMsg}</p>
                                        <h6 className="card-subtitle mb-2 text-muted">{value.userName}</h6>
                                    
                                        <div className="form-group shadow-textarea">
                                            <label htmlFor="exampleFormControlTextarea6">Comments : </label>
                                            <textarea className="form-control z-depth-1"
                                             id="exampleFormControlTextarea6"
                                             rows="3" placeholder="Write something here..."></textarea>
                                        </div>
                                                                               
                                    </div>  
                                    <div>
                                            <button className="btn btn-primary" type="submit">Comments</button>
                                            <label> </label>
                                            <button className="btn btn-primary"
                                             type="submit"
                                             onClick = {() => {likeAPost(value.id)}}>{value.Likes.length}{" "}  Like </button>
                                             
                                        </div>    
                                </div>
                            </div>
                        </div>        
                    </div>                   
                );
            })}
        </Fragment>
    );
}

export default Home
