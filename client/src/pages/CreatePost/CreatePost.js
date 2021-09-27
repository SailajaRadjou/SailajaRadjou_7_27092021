import React from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

function CreatePost() {

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
        });    
    }

    return (
        <div className="createPostPage">
            <Formik initialValues = {initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Title : </label>
                    <ErrorMessage name="title" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="title"
                        placeholder="Title here"
                    />
                    <label>Your Message : </label>
                    <ErrorMessage name="postTextMsg" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="postTextMsg"
                        placeholder="Type your message"
                    />
                    <label>Your Name : </label>
                    <ErrorMessage name="userName" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="userName"
                        placeholder="Your name"
                    />
                    <button typ="submit">Send Message</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost
