import React, {Fragment} from 'react';
import axios from 'axios';
import { useEffect, useState} from "react";
import '../Home/styles/Home.css';
function Home() {
    const [AllPosts, setAllPosts] = useState([]);

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
                    <div className="container mt-3 align-center">
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{value.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">
                                    {value.postTextMsg}
                                    </p>
                                    <a href="/#" className="card-link">{value.userName}</ a>
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
