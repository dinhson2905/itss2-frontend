import React, {useState, useEffect} from "react";
import axios from "axios";
import {Layout, Card, Input, List, Pagination, Row, Col, Breadcrumb} from "antd";
import {PhoneFilled, EnvironmentTwoTone, SearchOutlined} from "@ant-design/icons";
import Checkbox from './Section/Checkbox';
import {locations} from './Section/Data';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";

const {Meta} = Card;

export default function Shops() {
    const itemNumberOnePage = 9;
    const [data, setData] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(itemNumberOnePage);
    const [searchValue, setSearchValue] = useState("");
    const [Filters, setFilters] = useState({
        locations: [],
    })
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://itss-api.herokuapp.com/shops");
            const resultData = result.data;
            const dataArr = Object.keys(resultData).map((key) => resultData[key]);
            setData(dataArr);
        };
        fetchData();
    }, []);

    const onSearch = (value) => {
        setSearchValue(value.target.defaultValue)
    }

    const handleChange = (value) => {
        setMinValue((value - 1) * itemNumberOnePage);
        setMaxValue(value * itemNumberOnePage);
    };

    const renderShops = (data) => {
        let shops = [];
        if (searchValue !== "") {
            shops = data.filter(shop => {
                if (shop.name.toLowerCase().includes(searchValue.toLowerCase()))
                    return shop;
                else return null;
            });
        } else shops = data;
        Filters.locations.map(function (item,i) {
            shops=data.filter(shop=>{
                if(shop.local.toLowerCase().includes(item.toLowerCase())){
                    console.log(shop)
                    return shop;
                }
                else return null;
            })
        });
        return (
            <div>
                <List
                    grid={{gutter: 3, column: 3}}
                    dataSource={shops.slice(minValue, maxValue)}
                    renderItem={(shop) => (
                        <List.Item>
                            <Card
                                hoverable={true}
                                title={
                                    <div>
                                        <img
                                            style={{height: "25px", marginRight: "10px"}}
                                            alt="example"
                                            src={shop.logo}
                                        />
                                        {shop.name}
                                    </div>
                                }
                                // extra={<a href="#">More</a>}
                                style={{width: 350}}
                                cover={
                                    <img
                                        style={{height: "250px"}}
                                        alt="example"
                                        src={shop.imageURL}
                                    />
                                }
                            >
                                <Meta
                                    description={
                                        <div>
                                            <div>
                                                <PhoneFilled
                                                    twoToneColor="#eb2f96"
                                                    key="telephone"
                                                    style={{marginRight: "10px"}}
                                                />
                                                {shop.telephone}
                                            </div>
                                            <div>
                                                <EnvironmentTwoTone
                                                    twoToneColor="#eb2f96"
                                                    key="location"
                                                    style={{marginRight: "10px"}}
                                                />
                                                {shop.address}
                                            </div>
                                            <div>
                                                <EnvironmentTwoTone
                                                    twoToneColor="#eb2f96"
                                                    key="location"
                                                    style={{marginRight: "10px"}}
                                                />
                                                {shop.GGMapUrl}
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
                <Pagination total={shops.length} defaultPageSize={9} onChange={handleChange}/>
            </div>
        );
    };
    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters
        // console.log(newFilters)
        setFilters(newFilters)
    }
    return (

            <div style={{width: '80%', margin: '0rem auto'}}>
                <Breadcrumb style={{margin: "16px 0"}}>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/shops">Shops</Link></Breadcrumb.Item>
                </Breadcrumb>
                <Row gutter={[16, 16]}>
                    <Col lg={12} xs={24}>
                        <Checkbox
                            list={locations}
                            handleFilters={filters => handleFilters(filters, "locations")}
                        />
                    </Col>
                    <Col lg={12} xs={24}>
                        <div style={{width: 400}}>
                            <Autocomplete
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                selectOnFocus
                                onSelect={onSearch}
                                options={data.map((option) => option.name)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search Name of Shop"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{...params.InputProps, type: 'search'}}
                                    />
                                )}
                            />
                        </div>
                    </Col>
                </Row>
                {data.length === 0 ?
                    <div style={{display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center'}}>
                        <h2>No post yet...</h2>
                    </div> :
                    <div>
                        <Row gutter={[16, 16]}>
                            {renderShops(data)}
                        </Row>
                    </div>
                }
            </div>
    );
}
