import React, {Fragment} from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import { useHistory } from "react-router-dom";
import '../Login/login.css';
import logo from '../../images/icon-left-font-monochrome-black.png'
function Signup() {
       const initialValues = {
        userName:"",
        password:""
    };
    

    let history = useHistory();
    const validationSchema = Yup.object().shape({
        userName:Yup.string().min(3).max(20).required(),
        password:Yup.string().min(4).max(20).required()
    });

    const onSubmit = (data) => {
        try{
        axios.post("http://localhost:3001/auth/signup", data)
            .then((response) => {
                console.log("data"+response);
                history.push("/");
                localStorage.setItem("accessToken","");
            },
            
            );
           
        } 
        
        catch(e)
        {alert("Désolé User Existe déja!" + e)};
    };


    return (
        <Fragment>
            <div className="container m-5 align-center">
                <div className="row">
                    <div className="col">
                        <div className="card loginPage">
                        <img src={logo} className="logo_display logo_shadow img-fluid" alt="Info Logo" />
                            <Formik initialValues = {initialValues}
                             onSubmit={onSubmit}
                              validationSchema={validationSchema}>
                                <Form className="form-group formContainer loginContainer">
                                    <label>Username : </label>
                                    <ErrorMessage name="userName" component="span" />
                                    <Field
                                        id="inputCreatePost"
                                        name="userName"
                                        placeholder="Your name"
                                        
                                    /><br/>
                                    <label>Password : </label>
                                    <ErrorMessage name="password" component="span" />
                                    <Field
                                        type="password"
                                        id="inputCreatePost"
                                        name="password"
                                        placeholder="Password here"
                                       
                                    /><br/>
                                    <button type="submit" className="loginButton">SignUp</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Signup
