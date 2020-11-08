import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Layout,
  Card,
  Input,
  List,
  Pagination,
} from "antd";
import {
  PhoneFilled,
  EnvironmentTwoTone,
  SearchOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;
const { Search } = Input;
const suffix = <SearchOutlined style={{ fontSize: 16, color: "#1890ff" }} />;

export default function Shops() {
  const itemNumberOnePage = 9;
  const [data, setData] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(itemNumberOnePage);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/shops");
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

  const renderShops = (data) => {
    let shops = [];
    if (searchValue !== "") {
      shops = data.filter(shop => {
        if (shop.local.toLowerCase().includes(searchValue.toLowerCase()))
          return shop;
        else return null;
      });
    } else shops = data;

    return (
      <div>
        <List
          grid={{ gutter: 3, column: 3 }}
          dataSource={shops.slice(minValue, maxValue)}
          renderItem={(shop) => (
            <List.Item>
              <Card
                title={
                  <div>
                    <img
                      style={{ height: "25px", marginRight: "10px" }}
                      alt="example"
                      src={shop.logo}
                    />
                    {shop.name}
                  </div>
                }
                extra={<a href="#">More</a>}
                style={{ width: 350 }}
                cover={
                  <img
                    style={{ height: "250px" }}
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
                          style={{ marginRight: "10px" }}
                        />
                        {shop.telephone}
                      </div>
                      <div>
                        <EnvironmentTwoTone
                          twoToneColor="#eb2f96"
                          key="location"
                          style={{ marginRight: "10px" }}
                        />
                        {shop.address}
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
        <Breadcrumb.Item>Shops</Breadcrumb.Item>
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
        <div>{renderShops(data)}</div>
      </Content>
    </Layout>
  );
}
