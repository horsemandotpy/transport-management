import React from "react";
import {
  HeaderLogoWrapper,
  HeaderWraper,
  OptionWrapper,
  PofileWrapper,
} from "./headerStyle";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Space } from "antd";
import { imagines } from "../../assets";
import { Link, useLocation } from "react-router-dom";

const headerOption = [
  { name: "Hang Hoa", link: "/" },
  { name: "Tien trinh van chuyen moi", link: "/news" },
  { name: "Tien trinh van chuyen", link: "/tientrinh" },
  { name: "Doi tac", link: "/doitac" },
  { name: "Khach hang", link: "/khachhang" },
  { name: "Kho", link: "/kho" },
  { name: "Setting", link: "setting" },
];

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        anhminh
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        usersetting
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Logout
      </a>
    ),
  },
];

const Header = () => {
  const location = useLocation();
  
  return (
    <HeaderWraper>
      <HeaderLogoWrapper>
        <img src={imagines.logoHeader} alt="techlead-logo" />
      </HeaderLogoWrapper>
      <OptionWrapper>
        {headerOption.map((item) => {
          return <li key={item.name} className={location.pathname === item.link ? "active" : ""}><Link to={item.link}>{item.name}</Link></li>;
        })}
        <PofileWrapper>
          <Dropdown menu={{ items }} placement="bottom">
              <Badge count={0}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </Badge>
          </Dropdown>
        </PofileWrapper>
      </OptionWrapper>

    </HeaderWraper>
  );
};

export default Header;
