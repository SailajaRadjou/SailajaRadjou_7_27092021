import React from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import '../CreatePost/CreatePost.css';
import { useHistory } from 'react-router-dom';

function CreatePost() {

    let history = useHistory();
    const initialValues = {
        title:"",
        postTextMsg:"",
        userName:""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postTextMsg:Yup.string().required(),
        userName:Yup.string().min(3).required()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data)
        .then((response) => {
            console.log("Successfully Done ! ");
            history.push("/");
        });    
    }

   

    return (
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
                    <label>Your Name : </label>
                    <ErrorMessage name="userName" component="span" />
                    <Field
                        
                        id="inputCreatePost"
                        name="userName"
                        placeholder="Your name"
                    /><br/>
                    <button type="submit">Send Message</button>
                </Form>
            </Formik>
            </div>
            </div>
            </div>
        </div>
    )
}

export default CreatePost
