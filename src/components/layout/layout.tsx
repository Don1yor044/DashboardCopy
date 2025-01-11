import { useState, useEffect } from "react";
import { Layout as AntLayout, Button, Menu, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { RiHome6Line } from "react-icons/ri";
import { LuSearch, LuUserRound } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";

const { Header, Sider, Content } = AntLayout;

export const Layout = () => {
  const [collapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setSelectedKey("1");
    } else if (path === "/customers") {
      setSelectedKey("2");
    } else if (path === "/reports") {
      setSelectedKey("3");
    }
  }, [location]);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={330}
        className="!bg-[#FAFBFF] ps-5 relative"
      >
        <div className="demo-logo-vertical" />
        <div className="my-10 px-8">
          <Typography className="!text-black !m-0 font-bold text-4xl">
            Abu Sahiy
          </Typography>
          <Typography className="!text-[#FE5222] !m-0 text-xl">
            Dashboard
          </Typography>
        </div>
        <Menu
          className="mt-20 bg-[#FAFBFF] space-y-10"
          mode="inline"
          selectedKeys={[selectedKey]} // Dynamically change the selected key
          items={[
            {
              key: "1",
              icon: <RiHome6Line size={27} />,
              label: "Dashboard",
              onClick: () => navigate("/dashboard"),
              className:
                selectedKey === "1"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979] ",
            },
            {
              key: "2",
              icon: <RiHome6Line size={27} />,
              label: "Customers",
              onClick: () => navigate("/customers"),
              className:
                selectedKey === "2"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
            {
              key: "3",
              icon: <RiHome6Line size={27} />,
              label: "Reports",
              onClick: () => navigate("/reports"),

              className:
                selectedKey === "3"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
          ]}
        />
        <div className="absolute bottom-5 mx-8 border-t h-52 w-44">
          <div className="mt-10 space-y-5">
            <Button type="text" className="text-xl text-[#FE5222] flex gap-3">
              <LuUserRound /> Valijon
            </Button>
            <Button type="text" className="text-xl text-[#FE5222] flex gap-3">
              <TbLogout2 />
              Logout
            </Button>
          </div>
        </div>
      </Sider>
      <AntLayout style={{ height: "100vh" }}>
        <Header
          style={{ padding: "0px 30px 15px 15px", background: "#FAFBFF " }}
          className="h-28 flex items-end"
        >
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> */}

          <div className="bg-white flex gap-4 items-center rounded-full 2xl:w-[90%] w-[95%] mb-1 h-14 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
            <LuSearch size={25} color="#FE5222" />
            <Title level={4} className="!m-0">
              Search
            </Title>
          </div>
        </Header>
        <Content
          className="overflow-auto"
          style={{
            padding: "24px 20px",
            minHeight: 280,
            background: "#FAFBFF",
          }}
        >
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
