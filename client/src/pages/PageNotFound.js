import React from 'react';
import { Fragment } from 'react';
import {Link} from 'react-router-dom';
function PageNotFound() {
    return (
        <Fragment>
            <h1>Page Not Found :/</h1>
            <h2>Go to the Home page  <Link to={"/"}> Home Page</Link></h2>
            
        </Fragment>
    )
}

export default PageNotFound
