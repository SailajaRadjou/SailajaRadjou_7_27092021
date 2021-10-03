import React, {Fragment, useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function Profile() {

    let { id } = useParams();
    let history = useHistory();

    const [username, setUsername] = useState("");
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/profileinfo/${id}`)
        .then((response) => {
            setUsername(response.data.userName);
        });

        axios.get(`http://localhost:3001/posts/byuserId/${id}`)
        .then((response) => {
            setAllPosts(response.data);
        });
    }, []);

    return (
        <Fragment>
            <div>
                <div class="card text-center m-5">
                    <div class="card-body">
                        <h5 class="card-title"> Username: {username}</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                {allPosts.map((value, key) => {
                    return (
                        <div key={key} className="container m-5 align-center">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-body" onClick={() => {history.push(`/post/${value.id}`)}}>
                                            <h5 className="card-title">{value.title}</h5>
                                            <p className="card-text">{value.postTextMsg}</p>
                                            <h6 className="card-subtitle mb-2">{value.userName}</h6>
                                                                                                                         
                                        </div>  
                                        <div>
                                        <label className="card-text">&nbsp;&nbsp; {value.Likes.length} &nbsp;&nbsp;Likes </label> 
                                        </div>    
                                    </div>
                                </div>
                            </div>        
                        </div>                   
                    );
                })}
            </div>
        </Fragment>
    )
}

export default Profile
