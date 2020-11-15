import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import { Row, Col } from 'antd';
import { Button, Descriptions } from 'antd';

function DetailProduct(props){
  const id= props.match.params.id
  const [Product, setProduct]=useState([])
  useEffect(()=>{
    Axios.get(`http://localhost:5000/products/${id}`)
    .then(response=>{
        setProduct(response.data[0])
    })
  },)
  return (
    <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.name}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <img>{Product.image}</img>
                </Col>
                <Col lg={12} xs={24}>
                <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Name"> {Product.name}</Descriptions.Item>
                <Descriptions.Item label="Taste">{Product.taste}</Descriptions.Item>
                <Descriptions.Item label="Color"> {Product.color}</Descriptions.Item>
                {/* <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item> */}
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="medium" shape="round" type="danger"
                    // onClick={addToCarthandler}
                >
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
