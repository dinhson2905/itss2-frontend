import React from 'react';
import {Comment, Avatar, Tooltip } from 'antd';
import moment from 'moment';

function SingleComments(props) {

    return (
        <div>
            <Comment
                author={
                    <p style={{fontSize: 15, color: "#161515",fontWeight:'bold'}}>
                        {props.comment.name}
                    </p>
                }
                avatar={
                    <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large" gap={2}>
                        {props.comment.name}
                    </Avatar>
                }
                content={
                    <p style={{fontSize: 20, color: "#161515"}}>
                        {props.comment.content}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span style={{fontSize: 15}}>{moment().fromNow()}</span>
                    </Tooltip>
                }
            ></Comment>
        </div>
    )
}

export default SingleComments