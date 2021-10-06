import React, {Fragment} from 'react';
import axios from 'axios';
import { useEffect, useState, useContext} from "react";
import { useHistory } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from "../../Helpers/AuthContext";
import {Link} from 'react-router-dom';
import '../Home/styles/Home.css';
import { SliderValueLabel } from '@mui/material';

function Home() {
    const [AllPosts, setAllPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    const {authState} = useContext(AuthContext);


    let history = useHistory();


    useEffect(() => {

        if (!localStorage.getItem("accessToken")) {
            history.push("/login");
        }
        else{
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
        }
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
                                    <div className="card-body" onClick={() => {history.push(`/post/${value.id}`)}}>
                                        <h5 className="card-title">{value.title}</h5>
                                        <p className="card-text">{value.postTextMsg}</p>
                                        {(value.postImage!=="") &&
                                        <img src={value.postImage} className="img-fluid" alt="No Uploads" />}         
                                    </div>  
                                    <div className="likes_container">
                                        <div className="user_container">
                                            <label> Posted by : &nbsp;&nbsp;</label>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                            <Link to={`/profile/${value.UserId}`}>
                                                    {value.userName}
                                            </Link>
                                            </h6>
                                        </div>  
                                        <div className="likes_display">  
                                            <ThumbUpAltIcon
                                                onClick = {() => {likeAPost(value.id)}}
                                                className={!likedPosts.includes(value.id) ? "unLikeBtn" : "likeBtn"}
                                                />
                                            <label>&nbsp;&nbsp; {value.Likes.length} </label>
                                        </div>    
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
