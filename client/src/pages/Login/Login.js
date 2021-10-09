import React, { Fragment, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../Helpers/AuthContext";
import './login.css';
import logo from '../../images/icon-left-font-monochrome-black.png'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let history = useHistory();

    const login = (e) => {
        e.preventDefault();
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            localStorage.setItem("accessToken", response.data.token);
            setAuthState({
                username: response.data.userName,
                id: response.data.id,
                role: response.data.role,
                status: true,
            });
            history.push("/");
          }
        });
    };

    return (
        <Fragment>
           <div className="container m-5 align-center">            
           
           <div className="row">            
                    <div className="col">
                        <div className="card loginPage">
                        <img src={logo} className="logo_display logo_shadow img-fluid img-logo" alt="Info Logo" />
                            <form className="formContainer loginContainer">
                                <div className="form-group">
                                    <label forhtml="inputUsername">Username : </label>
                                    <input type="text"
                                        className="form-control"
                                        id="inputUsername"
                                        aria-describedby="Username"
                                        placeholder="Enter your name .."
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label forhtml="exampleInputPassword1">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary loginButton" onClick={login}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>    
        </Fragment>
    )
}

export default Login
