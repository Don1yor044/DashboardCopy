import { useState, useEffect } from "react";
import { Layout as AntLayout, Button, Menu, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiFileEditLine, RiHome6Line } from "react-icons/ri";
import { LuUserRound } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { PiBuildingsLight, PiUsersLight } from "react-icons/pi";
import { DashboardHeaderSearch, FilialsHeaderSearch } from "../headers";
import { ArxiveHeaderSearch } from "../headers/filialsHeaderSearch copy";
import searchStore from "../../store/store";

const { Sider, Content } = AntLayout;

export const Layout = () => {
  const [collapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setSelectedKey("1");
    } else if (path === "/filials") {
      setSelectedKey("2");
    } else if (path === "/arxive") {
      setSelectedKey("3");
    } else if (path === "/customers") {
      setSelectedKey("4");
    } else if (path === "/reports") {
      setSelectedKey("5");
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
              icon: <PiBuildingsLight size={27} />,
              label: "Filials",
              onClick: () => navigate("/filials"),
              className:
                selectedKey === "2"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
            {
              key: "3",
              icon: <PiBuildingsLight size={27} />,
              label: "Arxive",
              onClick: () => navigate("/arxive"),
              className:
                selectedKey === "3"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
            {
              key: "4",
              icon: <PiUsersLight size={27} />,
              label: "Customers",
              onClick: () => navigate("/customers"),
              className:
                selectedKey === "4"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
            {
              key: "5",
              icon: <RiFileEditLine size={26} />,
              label: "Reports",
              onClick: () => navigate("/reports"),
              className:
                selectedKey === "5"
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
        {location.pathname === "/dashboard" ? (
          <>
            <DashboardHeaderSearch
              totalPaymentFee={searchStore.totalPaymentFee}
              totalPrice={searchStore.totalPrice}
            />
          </>
        ) : location.pathname === "/arxive" ? (
          <>
            <ArxiveHeaderSearch />
          </>
        ) : (
          <>
            <FilialsHeaderSearch />
          </>
        )}

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
