import { useState, useEffect } from "react";
import { Layout as AntLayout, Menu, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RiBuilding4Line, RiHistoryFill, RiHome6Line } from "react-icons/ri";
import { LuFilter, LuUserRound } from "react-icons/lu";
import { PiBuildingsLight } from "react-icons/pi";
import { DashboardHeaderSearch } from "../headers";
import { ArxiveHeaderSearch } from "../headers/arxiveHeaderSearch";
import { MobileLayout } from "../mobileLayout/mobileLayout";
import { MobileTopBar } from "../mobileTopBar";
import { BsWallet } from "react-icons/bs";
import { LogOutButton } from "../logOutButton";
import { TbLogout2, TbReportAnalytics } from "react-icons/tb";

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
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("User_Name");
    localStorage.removeItem("Role");
    localStorage.removeItem("serviceId");
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
    } else if (path === "/payme") {
      setSelectedKey("6");
    } else if (path === "/report") {
      setSelectedKey("7");
    } else if (path === "/callCenter") {
      setSelectedKey("8");
    }
  }, [location]);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <div className="block md:hidden relative">
        <MobileLayout />
      </div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={330}
        className="!bg-[#FAFBFF] ps-5 relative hidden md:block"
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
          className="mt-12 bg-[#FAFBFF] space-y-8"
          mode="inline"
          selectedKeys={[selectedKey]}
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
            ...(UserRole !== "30"
              ? [
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
                ]
              : []),
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
            ...(UserRole !== "30"
              ? [
                  {
                    key: "6",
                    icon: <BsWallet size={24} />,
                    label: "Payme",
                    onClick: () => navigate("/payme"),
                    className:
                      selectedKey === "6"
                        ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent "
                        : "font-medium text-[25px] !text-[#797979]",
                  },
                ]
              : []),
            ...(UserRole !== "30"
              ? [
                  {
                    key: "7",
                    icon: <TbReportAnalytics size={28} />,
                    label: "Report",
                    onClick: () => navigate("/report"),
                    className:
                      selectedKey === "7"
                        ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent "
                        : "font-medium text-[25px] !text-[#797979]",
                  },
                ]
              : []),
            {
              key: "8",
              icon: <LuFilter size={25} />,
              label: "Call center",
              onClick: () => navigate("/callCenter"),
              className:
                selectedKey === "8"
                  ? "!text-[#FE5222] font-medium text-[25px] !bg-transparent"
                  : "font-medium text-[25px] !text-[#797979]",
            },
          ]}
        />
        <div className="absolute bottom-5 mx-8 border-t h-52 w-44">
          <div className="mt-10 space-y-6 ">
            <LogOutButton
              name={LocalStoregUserName}
              icon={<LuUserRound size={25} />}
            />

            {/* <Button
              type="text"
              className="text-2xl text-[#FE5222] flex gap-3 shadow-[2px_2px_10px_rgba(0,0,0,0.199)] !py-5 rounded-full"
            >
              <LuUserRound />
              {LocalStoregUserName || "User yo'q"}
            </Button> */}
            <div onClick={ClearStoreg}>
              <LogOutButton name="Chiqish" icon={<TbLogout2 size={25} />} />
            </div>
            {/* <Button
              type="text"
              className="text-2xl text-[#FE5222] flex gap-3"
              onClick={ClearStoreg}
            >
              <TbLogout2 />
              Chiqish
            </Button> */}
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
        ) : (
          // : location.pathname === "/filters" ? (
          //   <FilterHeaderSearch />
          // ) :
          <></>
        )}
        <div className="block md:hidden ">
          <MobileTopBar />
        </div>
        <Content className="overflow-y-auto scroll-smooth overscroll-contain p-1 md:p-5 bg-[#FAFBFF]">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
