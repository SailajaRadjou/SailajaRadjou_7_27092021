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
    return (
        <Fragment>
            {AllPosts.map((value, key) => {
                return (
                    <div className="container m-5 align-center">
                        <div className="row">
                            <div className="col">
                                <div class="card">
                                <div class="card-body" onDoubleClick={() => {history.push(`/post/${value.id}`)}}>
                                    <h5 class="card-title">{value.title}</h5>
                                    <p class="card-text">{value.postTextMsg}</p>
                                    <h6 class="card-subtitle mb-2 text-muted">{value.userName}</h6>
                                    <a href="/" class="card-link">Comments</a>
                                    <a href="/" class="card-link">Back to Forum</a>
                                </div>
                                </div>
                            </div>
                        </div>        
                    </div>    
                   
                );
            })}
        </Fragment>
    )
}

export default Home
