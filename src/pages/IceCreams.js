import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import "../index.css";
import DetailProduct from "./DetailProduct.js"
import {
  Breadcrumb,
  Layout,
  Card,
  Input,
  List,
  Pagination,
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
  const api= "http://localhost:5000/products";
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(api);
      const resultData = result.data;
      const dataArr = Object.keys(resultData).map((key) => resultData[key]);
      setData(dataArr);
    };
    fetchData();
  }, []);

  const openPopup = id => {
    axios(api + "/" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setData(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setData(prevState => {
      return { ...prevState, selected: {} }
    });
  }
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
                extra={<Popup trigger={<button> Trigger</button>} position="center center">
                {close => <DetailProduct close={close} />}              
              </Popup>}
                style={{ width: 350 }}
                cover={
                  <img
                    style={{ height: "250px" }}
                    alt="example"
                    src={product.image}
                  />
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
        <Pagination total={50} defaultPageSize={9} onChange={handleChange} />
      </div>
    );
  };

  return (
    <Layout style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Ice Cream</Breadcrumb.Item>
      </Breadcrumb>
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
