import React, { Fragment, useState } from 'react';
import axios from 'axios';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const changePassword = () => {
        axios.put("http://localhost:3001/auth/changepassword",
            {
            oldPassword: oldPassword,
            newPassword: newPassword,
            },
            {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
            }
            )
            .then((response) => {
            if (response.data.error) {
            alert(response.data.error);
            }
        });
    };
  
    return (
        <Fragment>
            <div className="container m-5 align-center">            
                <div className="row">
                    <div className="col">
                        <div className="card loginPage">
                            <form className="formContainer loginContainer">
                                <div className="form-group">
                                    <label forhtml="formGroupExampleInput">Old Password : </label>
                                    <input type="password"
                                     className="form-control"
                                     id="formGroupExampleInput"
                                     placeholder="Enter your old password...."
                                     onChange={(event) => {
                                        setOldPassword(event.target.value);
                                     }} />
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput2">New Password : </label>
                                    <input type="password"
                                     className="form-control"
                                     id="formGroupExampleInput2"
                                     placeholder="Enter your old password...."
                                     onChange={(event) => {
                                        setNewPassword(event.target.value);
                                     }} />
                                </div>
                                <button type="submit"
                                 className="btn btn-primary loginButton"
                                 onClick={changePassword}>Modifier</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ChangePassword
