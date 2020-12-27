import React, {useCallback, useEffect, useState} from 'react'
import {Form, Button, Input,Modal} from 'antd';
import axios from "axios";
import SingleComments from './SingleComments';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const {TextArea} = Input;

function Comments(props) {

    const [visible, setVisible] = useState(false);

    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title="User form feedback"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Content">
                        <Input type="textarea" />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };


    const onCreate = (e) => {
        const variables = {
            name: e.name,
            content: e.content,
            postId: props.postId
        }
        console.log('Received values of form: ', variables);

        axios.post('https://itss-api.herokuapp.com/comment/saveComment', variables)
            .then(response => {
                // console.log(response)
                if (response.data.status === 200) {
                    // console.log(response.data.data)
                    props.refreshFunction(response.data.data)
                    setVisible(false);
                } else {
                    alert("fail to submit")
                }

            })
    };
    return (
        <div style={{width:'600px'}}>
            <br/>
            <p style={{fontSize: 20, color: "#0d0da5",fontWeight:'bold'}}>Feedback from User</p>
            <hr/>
            {/*Comment Lists*/}
            {console.log(props.CommentLists)}
            {props.CommentLists && props.CommentLists.map((comment, index) => (
                <div style={{margin:'0rem 2rem'}}>
                    <React.Fragment>
                        <SingleComments comment={comment} postId={props.postId}
                                        refreshFunction={props.refreshFunction}/>
                    </React.Fragment>

                </div>

            ))}
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                User feedback
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    )

}

export default Comments