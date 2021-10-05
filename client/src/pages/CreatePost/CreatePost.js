import React, {Fragment, useState} from 'react';
import { useContext, useEffect } from 'react';
import axios from 'axios';
//import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import '../CreatePost/CreatePost.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Helpers/AuthContext';

function CreatePost() {

    
    const [title, setTitle] = React.useState();
    const [textMsg, setTextMsg] = React.useState();
    const [uploadFile, setUploadFile] = React.useState();

    const { authState } = useContext(AuthContext);

    let history = useHistory();

    

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          history.push("/login");
        }
    }, []);

      

    const onSubmit = (event) => {
        //console.log("data"+JSON.stringify(data));
        event.preventDefault();
        const dataArray = new FormData();
    dataArray.append("title", title);
    dataArray.append("postTextMsg", textMsg);
    dataArray.append("image", uploadFile);
        axios
        .post("http://localhost:3001/posts", dataArray, {
          headers: { 'Content-Type': 'multipart/form-data',accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          history.push("/");
        });
    }   
     
   

    return (
        <Fragment>
            <div className="container m-5 align-center">
                <div className="row">
                    <div className="col">
                        <div className="card createPostPage">
                           
                         <form onSubmit={onSubmit}>
                            <div class="form-group">
                                <label for="formGroupExampleInput">Title</label>
                                <input type="text" class="form-control" id="formGroupExampleInput"
                                 placeholder="Example input" name="title"
                                 onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Post your message</label>
                                <input type="text" class="form-control" 
                                id="formGroupExampleInput2" placeholder="Another input"
                                 name="postTextMsg"
                                 onChange={(e) => setTextMsg(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label for="formGroupExampleInput2">Upload</label>
                                <input type="file" class="form-control"
                                name="image"
                                 id="formGroupExampleInput2" placeholder="Another input"
                                 onChange={(e) => setUploadFile(e.target.files[0])}/>
                            </div>
                            <button type="submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreatePost