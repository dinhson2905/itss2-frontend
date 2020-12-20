import React from 'react';
import {Comment, Avatar, Tooltip ,Button, Input} from 'antd';
import moment from 'moment';

import { UserOutlined } from '@ant-design/icons';

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
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
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