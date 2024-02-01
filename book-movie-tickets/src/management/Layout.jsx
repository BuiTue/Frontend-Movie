import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout as LayoutAntd, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../api/auth/helper";
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";


const { Header, Sider, Content } = LayoutAntd;

const Layout = () => {
  const navigate = useNavigate();
  const userInfo=getUserInfo();
 
  
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const hanleMenuClick = (info) => {
    navigate(info.key);
  };

  const items = [
    {
        key: "home",
        icon: <UserOutlined />,
        label: "home",
      },
    {
      key: "cinema",
      icon: <UserOutlined />,
      label: "Danh sách rạp chiếu",
    },
    {
      key: "movie",
      icon: <VideoCameraOutlined />,
      label: "Danh sách phim",
    },
    {
      key: "schedule",
      icon: <UploadOutlined />,
      label: "Danh sách lịch chiếu",
    },
    
  ];

  return (
    <LayoutAntd>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/home"]}
          items={items}
          onClick={hanleMenuClick}
        />
      </Sider>
      <LayoutAntd>
        <Header style={{ padding: 0, background: colorBgContainer,position:"sticky",backgroundColor:"orange" }}>
            <Row>
                <Col><Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> 
          </Col>
            
            <Col><p>Xin chào {userInfo.fullName}   (<b>{userInfo.role}</b>)</p></Col>
            
            
            
               
          
          </Row>
          
          
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <p> {<Outlet />}</p>
        </Content>
      </LayoutAntd>
    </LayoutAntd>
  );
};

export default Layout;
