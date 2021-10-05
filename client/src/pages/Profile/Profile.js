import React, {Fragment, useEffect, useState, useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../Helpers/AuthContext";
function Profile() {

    let { id } = useParams();
    let history = useHistory();
    const {authState} = useContext(AuthContext);
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

    const deleteUser = () => {
        axios.delete(`http://localhost:3001/auth/${id}`,{
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }  
        })
        .then(() => {
            alert("User Account Deleted Successfully");
            history.push("/signup");
        });
    }

    return (
        <Fragment>
            <div>
                <div className="card text-center m-5">
                    <div className="card-body">
                        <h5 className="card-title"> Username: {username}</h5>
                        {authState.username === username && (
                            <>
                                <button className="btn btn-primary" type="submit"
                                    onClick={() => {
                                        history.push("/changepassword");
                                    }}>Change Password</button>
                                <button className="btn btn-primary" type="submit"
                                    onClick={() => {
                                        deleteUser()
                                    }}>Delete Account</button>
                            </>        
                        )}
                        
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
                                            <img src={value.postImage} className="img-fluid" alt="Responsive image" /> 
                                            
                                                                                                                         
                                        </div>  
                                        <div>
                                        <h6 className="card-subtitle mb-2">{value.userName}</h6>    
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
