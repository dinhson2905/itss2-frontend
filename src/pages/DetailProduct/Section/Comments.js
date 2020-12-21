import React, {useEffect, useState} from 'react'
import {Form, Button, Input} from 'antd';
import axios from "axios";
import SingleComments from './SingleComments';
import PerfectScrollbar from 'react-perfect-scrollbar'
const {TextArea} = Input;

function Comments(props) {
    const [Comment, setComment] = useState("");
    const [Name, setName] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            name: Name,
            content: Comment,
            postId: props.postId
        }

        // console.log(variables);
        axios.post('http://localhost:5000/comment/saveComment', variables)
            .then(response => {
                // console.log(response)
                if (response.data.status === 200) {
                    setName("")
                    setComment("")
                    // console.log(response.data.data)
                    props.refreshFunction(response.data.data)
                } else {
                    alert("fail to submit")
                }
            })
    }
    return (
        <div>
            <br/>
            <p>Feedback from User</p>
            <hr/>
            {/*Comment Lists*/}
            {console.log(props.CommentLists)}
            {props.CommentLists && props.CommentLists.map((comment, index) => (
                <React.Fragment>
                    <SingleComments comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
                </React.Fragment>
            ))}
            {/*Root Comment Form*/}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <input onChange={e => setName(e.target.value)} placeholder="Write your name">
                </input>
                <br/>
                <TextArea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={e => setComment(e.target.value)}
                    value={Comment}
                    placeholder="write some comment"
                />
                <br/>
                <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )

}

export default Comments