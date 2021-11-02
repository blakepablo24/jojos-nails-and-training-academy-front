import React from 'react';
import classes from './GoBack.module.css';
import { MdArrowBack } from "react-icons/md";

const goBack = (props) => {

    let style = classes.GoBack;

    // if(props.snippet){
    //     style = classes.Snippet;
    // }

    return(
        <div className={style} onClick={props.back}><MdArrowBack /> <h4>Go back</h4></div>
    )
}

export default goBack