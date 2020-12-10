import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Card, Row, Col, List} from 'antd';
import {Button, Descriptions} from 'antd';
import {useHistory} from "react-router-dom";
import ImageGallery from 'react-image-gallery';
const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];
const {Meta} = Card;

function DetailProduct(props) {
    let history = useHistory();
    const id = props.match.params.id
    const [Product, setProduct] = useState([])
    useEffect(() => {
        Axios.get(`https://itss-api.herokuapp.com/products/${id}`)
            .then(response => {
                setProduct(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    var sameType = Product.sameType;
    console.log(sameType)
    return (
        <div className="postPage" style={{width: '100%', padding: '3rem 4rem'}}>

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h1>{Product.name}</h1>
            </div>
            <br/>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/*<img*/}
                    {/*    style={{height: "600px"}}*/}
                    {/*    // alt="example"*/}
                    {/*    src={Product.image}*/}
                    {/*/>*/}
                    <ImageGallery items={images} />
                </Col>
                <Col lg={12} xs={24}>
                    <div>
                        <Descriptions title="Product Info">
                            <Descriptions.Item label="Name"> {Product.name}</Descriptions.Item>
                            <Descriptions.Item label="Taste">{Product.taste}</Descriptions.Item>
                            <Descriptions.Item label="Color"> {Product.color}</Descriptions.Item>

                        </Descriptions>
                        <Descriptions title="Same Type Taste">
                            <ul>
                                {
                                    sameType && sameType.map(function (el, index) {
                                        return (
                                            <div key={index}>
                                                <List.Item>
                                                    <Card
                                                        style={{width: 100}}
                                                        cover={
                                                            <a href={`/ice-cream/${el.id}`}>
                                                                <img
                                                                    style={{height: "250px"}}
                                                                    alt="example"
                                                                    src={el.image}
                                                                />
                                                            </a>
                                                        }
                                                    >
                                                        <Meta
                                                            description={
                                                                <div>
                                                                    <div>
                                                                        <span
                                                                            twoToneColor="#eb2f96"
                                                                            key="name"
                                                                            style={{marginRight: "10px"}}
                                                                        />
                                                                        {el.name}
                                                                    </div>
                                                                </div>
                                                            }
                                                        />
                                                    </Card>
                                                </List.Item>
                                            </div>
                                        )
                                    })}
                            </ul>
                        </Descriptions>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button size="medium" shape="round" type="danger" onClick={() => history.goBack()}>
                                Comeback
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DetailProduct
