import React, {useEffect, useState} from 'react'
import {Button, Col, Descriptions} from 'antd';
import {useHistory} from "react-router-dom";

function ProductInfo(props) {
    let history = useHistory();
    const [Product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])


    return (
        <div>
            <div style={{fontSize: 20}}>
                <h1>{Product.name}</h1>
            </div>
            <Descriptions title="Product Info">
                <Descriptions.Item>
                    <div style={{fontSize: 30, color: "#ff1818"}}>
                        <p>{`$${Product.price}`}</p>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Taste">
                    <div style={{fontSize: 15, fontWeight: 'bold'}}>
                        <p>{Product.taste}</p>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Pencil Color">
                    <div style={{fontSize: 15, fontWeight: 'bold'}}>
                        <p>{Product.color}</p>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item>
                    <div style={{fontSize: 15, fontStyle: 'italic', color: '#666',fontFamily:'futura-pt,Helvetica,Arial,sans-serif'}}>
                        <p>{Product.description}</p>
                    </div>
                </Descriptions.Item>
            </Descriptions>

            <br/>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button size="medium" shape="round" type="danger" onClick={() => history.goBack()}>
                    Comeback
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
