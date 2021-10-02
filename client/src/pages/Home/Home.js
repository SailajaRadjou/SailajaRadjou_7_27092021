import React, {Fragment} from 'react';
import axios from 'axios';
import { useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import '../Home/styles/Home.css';

function Home() {
    const [AllPosts, setAllPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    let history = useHistory();


    useEffect(() => {
        axios.get("http://localhost:3001/posts",
        { headers: { accessToken: localStorage.getItem("accessToken") } })
        .then((response) => {
            setAllPosts(response.data.AllPosts);
            setLikedPosts(
                response.data.likedPosts.map((like) => {
                    return like.PostId;
                })
            );
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
            if (likedPosts.includes(postId)) {
                setLikedPosts(
                  likedPosts.filter((id) => {
                    return id != postId;
                  })
                );
              } else {
                setLikedPosts([...likedPosts, postId]);
              }
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
                                            <ThumbUpAltIcon
                                                onClick = {() => {likeAPost(value.id)}}
                                                className={!likedPosts.includes(value.id) ? "unLikeBtn" : "likeBtn"}
                                                />
                                            <label> {value.Likes.length} </label>
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
