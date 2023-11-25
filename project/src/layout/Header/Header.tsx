import {
  HeaderLogoWrapper,
  HeaderWraper,
  OptionWrapper,
  PofileWrapper,
} from "./headerStyle";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, MenuProps, } from "antd";
import { imagines } from "../../assets";
import { Link, useLocation } from "react-router-dom";



const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link to="/user/info-user">
        anhminh
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link to="/user/settings">
        User Settings
      </Link>
    ),
  },
  {
    key: '3',
    label: (
      <a>
        Logout
      </a>
    ),
  },
];

const Header = ({ headerOption }: any) => {
  const location = useLocation();

  return (
    <HeaderWraper>
      <HeaderLogoWrapper>
        <img src={imagines.logoHeader} alt="techlead-logo" />
      </HeaderLogoWrapper>
      <OptionWrapper>
        {headerOption.map((item: any) => {
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
