import React from 'react';
import {Comment, Avatar, Tooltip ,Button, Input} from 'antd';
import moment from 'moment';


function SingleComments(props) {

    return (
        <div>
            <Comment
                author={props.comment.name}
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            ></Comment>
        </div>
    )
}

export default SingleComments