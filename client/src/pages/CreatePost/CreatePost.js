import React, {Fragment} from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import '../CreatePost/CreatePost.css';
import { useHistory } from 'react-router-dom';

function CreatePost() {

    
    const [title, setTitle] = React.useState();
    const [textMsg, setTextMsg] = React.useState();
    const [uploadFile, setUploadFile] = React.useState();

    let history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          history.push("/login");
        }
    }, []);      

    const onSubmit = (event) => {
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
                        <div className="card createPostPage loginPage">
                           
                         <form className="formContainer loginContainer" onSubmit={onSubmit}>
                            <div className="form-group">
                                <label for="formGroupExampleInput">Title</label>
                                <input type="text" className="form-control" id="formGroupExampleInput"
                                 placeholder="Example input" name="title"
                                 onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Post your message</label>
                                <input type="text" className="form-control" 
                                id="formGroupExampleInput2" placeholder="Another input"
                                 name="postTextMsg"
                                 onChange={(e) => setTextMsg(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput2">Upload</label>
                                <input type="file" className="form-control"
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