import React, {useState, useEffect} from "react";
import axios from "axios";
import "../../index.css";
import {Layout, Card, Input, List, Pagination, Row, Col} from "antd";
import {SearchOutlined,} from "@ant-design/icons";
import Checkbox from "../IceCream/Section/Checkbox";
import Checkbox2 from "./Section/Checkbox2";
import {taste, color} from "./Section/Data";

const {Content} = Layout;
const {Meta} = Card;
const {Search} = Input;
const suffix = <SearchOutlined style={{fontSize: 16, color: "#1890ff"}}/>;

export default function Products() {
    const itemNumberOnePage = 9;
    const [data, setData] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(itemNumberOnePage);
    const [searchValue, setSearchValue] = useState("");
    const api = "https://itss-api.herokuapp.com/products";
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(api);
            const resultData = result.data;
            const dataArr = Object.keys(resultData).map((key) => resultData[key]);
            setData(dataArr);
        };
        fetchData();
    }, []);
    const [Filters, setFilters] = useState({
        taste: [],
        color: []
    })

    const onSearch = (value) => {
        setSearchValue(value)
    }

    const handleChange = (value) => {
        setMinValue((value - 1) * itemNumberOnePage);
        setMaxValue(value * itemNumberOnePage);
    };

    const renderProducts = (data) => {
        let products = [];
        if (searchValue !== "") {
            products = data.filter(product => {
                if (product.name.toLowerCase().includes(searchValue.toLowerCase()))
                    return product;
                else return null;
            });
        } else products = data;
        Filters.taste.map(function (item, i) {
            products = data.filter(product => {
                if (product.taste.toLowerCase().includes(item.toLowerCase())) {
                    console.log(product)
                    return product;
                } else return null;
            })
        });
        Filters.color.map(function (item, i) {
            products = data.filter(product => {
                if (product.color.toLowerCase().includes(item.toLowerCase())) {
                    console.log(product)
                    return product;
                } else return null;
            })
        });
        return (
            <div>
                <List
                    grid={{gutter: 3, column: 3}}
                    dataSource={products.slice(minValue, maxValue)}
                    renderItem={(product) => (
                        <List.Item>
                            <Card
                                style={{width: 350}}
                                cover={
                                    <a href={`/ice-cream/${product.id}`}>
                                        <img
                                            style={{height: "250px"}}
                                            alt="example"
                                            src={product.image}
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
                                                {product.name}
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
                <Pagination total={18} defaultPageSize={9} onChange={handleChange}/>
            </div>
        );
    };
    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters
        console.log(newFilters)
        setFilters(newFilters)
    }
    return (
        <Layout style={{margin: "0 0px"}}>
            <h1 className='products'>My Products</h1>

            <div style={{width: '70%', margin: '0rem auto'}}>
                <Row gutter={[20, 20]}>
                    <Col lg={12} xs={24}>
                        <Checkbox
                            list={taste}
                            handleFilters={filters => handleFilters(filters, "taste")}
                        />
                    </Col>
                    <Col lg={12} xs={24}>
                        <Checkbox2
                            list={color}
                            handleFilters={filters => handleFilters(filters, "color")}
                        />
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    <Col lg={12} xs={24}>
                    </Col>
                    <Col lg={12} xs={24}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            margin: '1rem auto',
                            marginBottom: "20px"
                        }}>
                            <Search
                                placeholder="input search text"
                                enterButton="Search"
                                size="large"
                                suffix={suffix}
                                onSearch={onSearch}
                            ></Search>
                        </div>
                    </Col>
                </Row>

                {data.length === 0 ?
                    <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                        <h2>No post yet...</h2>
                    </div> :
                    <div>
                        <Row gutter={[16, 16]}>
                            {renderProducts(data)}
                        </Row>
                    </div>
                }
            </div>
        </Layout>
    );
}
