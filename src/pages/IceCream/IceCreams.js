import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../index.css";
import {
  Layout,
  Card,
  Input,
  List,
  Pagination,
    Row,Col
} from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;
const { Search } = Input;
const suffix = <SearchOutlined style={{ fontSize: 16, color: "#1890ff" }} />;

export default function Products() {
  const itemNumberOnePage = 9;
  const [data, setData] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(itemNumberOnePage);
  const [searchValue, setSearchValue] = useState("");
  const api= "https://itss-api.herokuapp.com/products";
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api);
      const resultData = result.data;
      const dataArr = Object.keys(resultData).map((key) => resultData[key]);
      setData(dataArr);
    };
    fetchData();
  }, []);


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
        if (product.name.toLowerCase().includes(searchValue.toLowerCase())
            || product.color.toLowerCase().includes(searchValue.toLowerCase())
            || product.taste.toLowerCase().includes(searchValue.toLowerCase()))
          return product;
        else return null;
      });
    } else products = data;
    

    return (
      <div>
        <List
          grid={{ gutter: 3, column: 3 }}
          dataSource={products.slice(minValue, maxValue)}
          renderItem={(product) => (
            <List.Item>
              <Card
                style={{ width: 350 }}
                cover={
                  <a href={`/ice-cream/${product.id}`}>
                  <img
                    style={{ height: "250px" }}
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
                          style={{ marginRight: "10px" }}
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
        <Pagination total={18} defaultPageSize={9} onChange={handleChange} />
      </div>
    );
  };

  return (
    <Layout style={{ margin: "0 0px" }}>
        <h1 className='products'>My Products</h1>
      <Content
        class="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
            style={{ width: "40%" }}
          ></Search>
        </div>
        <div>{renderProducts(data)}</div>
      </Content>
    </Layout>
  );
}
