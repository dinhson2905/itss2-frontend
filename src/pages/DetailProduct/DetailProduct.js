import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Card, Row, Col, List, Breadcrumb} from 'antd';
import {Button, Descriptions} from 'antd';
import {Link, useHistory} from "react-router-dom";
import ProductImage from './Section/ProductImage';
import Comments from './Section/Comments';
import ProductInfo from "./Section/ProductInfo";

const {Meta} = Card;

function DetailProduct(props) {
    const id = props.match.params.id
    const [Product, setProduct] = useState([])
    const [CommentList, setCommentList] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:5000/products/${id}`)
            .then(response => {
                setProduct(response.data)
            })
            .catch((err) => {
                console.log(err);
            })

        Axios.post('http://localhost:5000/comment/getComment', {id})
            .then(response => {
                console.log(response)
                if (response.data.status === 200) {
                    console.log(response.data.data)
                    setCommentList(response.data.data)
                } else {
                    alert("fail to submit")
                }
            })
    }, [])
    const updateComment = (newComment) => {
        setCommentList(CommentList.concat(newComment))
    }
    var sameType = Product.sameType;
    console.log(sameType)
    return (
        <div className="postPage" style={{width: '100%', padding: '2rem 15rem'}}>
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/ice-creams">Products</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{Product.name}</Breadcrumb.Item>
            </Breadcrumb>
            <br/>
            <Row gutter={[5,5]}>
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo
                        detail={Product} />
                </Col>
            </Row>
            <Descriptions title="Same Type Taste">
                <ul>
                    {
                        sameType && sameType.map(function (el, index) {
                            return (
                                <div key={index}>
                                    <List.Item>
                                        <Card
                                            hoverable={true}
                                            cover={
                                                <a href={`/ice-cream/${el.id}`}>
                                                    <img
                                                        style={{height: "200px"}}
                                                        alt="example"
                                                        src={el.image}
                                                    />
                                                </a>
                                            }
                                        >
                                            <Meta
                                                title={el.name}
                                            />
                                        </Card>
                                    </List.Item>
                                </div>
                            )
                        })}
                </ul>
            </Descriptions>
            <div style={{display: 'flex', justifyContent: 'flex-start',padding: '0rem 2rem'}}>
                <Comments CommentLists={CommentList} postId={Product.id} refreshFunction={updateComment}/>
            </div>
        </div>
    )
}

export default DetailProduct
