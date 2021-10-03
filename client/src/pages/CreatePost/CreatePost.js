import React, {Fragment} from 'react';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import '../CreatePost/CreatePost.css';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Helpers/AuthContext';

function CreatePost() {

    const { authState } = useContext(AuthContext);

    let history = useHistory();

    const initialValues = {
        title:"",
        postTextMsg:"",
    };

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          history.push("/login");
        }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postTextMsg:Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios
        .post("http://localhost:3001/posts", data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
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
                            <Formik initialValues = {initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                                <Form className="form-group formContainer">
                                    <label>Title : </label>
                                    <ErrorMessage name="title" component="span" />
                                    <Field                        
                                        id="inputCreatePost"
                                        name="title"
                                        placeholder="Title here"
                                    /><br/>
                                    <label>Your Message : </label>
                                    <ErrorMessage name="postTextMsg" component="span" />
                                    <Field                        
                                        id="inputCreatePost"
                                        name="postTextMsg"
                                        placeholder="Type your message"
                                    /><br/>
                                    <button type="submit">Send Message</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreatePost