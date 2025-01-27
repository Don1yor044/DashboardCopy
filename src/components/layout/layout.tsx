import { useState, useEffect } from "react";
import { Layout as AntLayout, Button, Menu, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiBuilding4Line, RiHistoryFill, RiHome6Line } from "react-icons/ri";
import { LuFilter, LuUserRound } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { PiBuildingsLight } from "react-icons/pi";
import { DashboardHeaderSearch } from "../headers";
import { ArxiveHeaderSearch } from "../headers/arxiveHeaderSearch";
import { FilterHeaderSearch } from "../headers/filterHeaderSearch";

const { Sider, Content } = AntLayout;

export const Layout = ({
  totalPaymentFee,
  totalPrice,
  residual,
}: {
  totalPaymentFee: number;
  totalPrice: number;
  residual: number;
}) => {
  const [collapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");
  const LocalStoregUserName = localStorage.getItem("User_Name");
  const UserRole = localStorage.getItem("Role");

  const ClearStoreg = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User_Name");
    localStorage.removeItem("Role");
    window.location.reload();
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setSelectedKey("1");
    } else if (path === "/filials") {
      setSelectedKey("2");
    } else if (path === "/postomat") {
      setSelectedKey("3");
    } else if (path === "/arxiv") {
      setSelectedKey("4");
    } else if (path === "/filters") {
      setSelectedKey("5");
    } else if (path === "/discounted") {
      setSelectedKey("2");
    } else if (path === "/departments") {
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
        <div
          className="my-10 px-8 cursor-pointer"
          onClick={() => window.location.reload()}
        >
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
                  : "font-medium text-[25px] !text-[#797979]",
            },
            ...(UserRole !== "30"
              ? [
                  {
                    key: "2",
                    icon: <PiBuildingsLight size={27} />,
                    label: "Filiallar",
                    onClick: () => navigate("/filials"),
                    className:
                      selectedKey === "2"
                        ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                        : "font-medium text-[25px] !text-[#797979]",
                  },
                ]
              : []),
            {
              key: "3",
              icon: <RiBuilding4Line size={27} />,
              label: "Postomat",
              onClick: () => navigate("/postomat"),
              className:
                selectedKey === "3"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
            {
              key: "4",
              icon: <RiHistoryFill size={27} />,
              label: "Arxiv",
              onClick: () => navigate("/arxiv"),
              className:
                selectedKey === "4"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
            {
              key: "5",
              icon: <LuFilter size={25} />,
              label: "Filter",
              onClick: () => navigate("/filters"),
              className:
                selectedKey === "5"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
          ]}
        />
        <div className="absolute bottom-5 mx-8 border-t h-52 w-44">
          <div className="mt-10 space-y-6 ">
            <Button type="text" className="text-2xl text-[#FE5222] flex gap-3">
              <LuUserRound />
              {LocalStoregUserName || "User yo'q"}
            </Button>
            <Button
              type="text"
              className="text-2xl text-[#FE5222] flex gap-3"
              onClick={ClearStoreg}
            >
              <TbLogout2 />
              Chiqish
            </Button>
          </div>
        </div>
      </Sider>
      <AntLayout style={{ height: "100vh" }}>
        {location.pathname === "/dashboard" ? (
          <DashboardHeaderSearch
            totalPaymentFee={totalPaymentFee}
            totalPrice={totalPrice}
            residual={residual}
          />
        ) : location.pathname === "/arxiv" ? (
          <ArxiveHeaderSearch />
        ) : location.pathname === "/filters" ? (
          <FilterHeaderSearch />
        ) : (
          <></>
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
