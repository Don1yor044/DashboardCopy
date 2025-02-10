/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { Empty, Pagination, Segmented, message } from "antd";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../utils/api";
import { FiltersHeader } from "../filtersHeader/filtersHeader";
import { IfiltersData } from "../../../types/types";
import { FiltersCards } from "../filtersCards/filtersCards";
import { paginationStyle } from "../../../components/paginationStyles/paginationStyles";
import { observer } from "mobx-react-lite";
import { FiltersLists } from "../filtersLists/filtersLists";
import { HiMiniBars3 } from "react-icons/hi2";
import { AiOutlineAppstore } from "react-icons/ai";
import { Loader } from "../../../components";

export const FiltersContainer = observer(() => {
  const [region, setRegion] = useState<string>("1");
  const [data, setData] = useState<IfiltersData[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState<string>("region");
  const [currentEndpoint, setCurrentEndpoint] = useState(
    `/api/admin/pda/item/sort/by/region/1`
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [segmentValue, setSegmentValue] = useState(
    window.innerWidth <= 768 ? "app" : "list"
  );
  useEffect(() => {
    const handleResize = () => {
      setSegmentValue(window.innerWidth <= 768 ? "app" : "list");
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const pageSize = 10;

  const navigate = useNavigate();

  const fetchData = async (endpoint: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      navigate("/");
      return;
    }

    try {
      const response = await baseURL.get(
        `${endpoint}?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "response");

      const dashboard = response.data?.data?.data || [];
      setTotalItems(response.data.data.total);
      setData(dashboard);
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to fetch data. Please try again.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      navigate("/");
      return;
    }

    try {
      const response = await baseURL.get(
        `api/client/dashboard/filter/users?page=${currentPage}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data, "response");

      const dashboard = response.data?.data || [];
      setTotalItems(response.data.total || dashboard.length);
      setData(dashboard);
    } catch (error) {
      console.error("API Error:", error);
      message.error("Failed to fetch data. Please try again.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    setActiveButton("region");
    setCurrentPage(1);
    setCurrentEndpoint(`/api/admin/pda/item/sort/by/region/${value}`);
  };

  const handleDateDesc = () => {
    setActiveButton("desc");
    setCurrentPage(1);
    setCurrentEndpoint(`/api/admin/pda/item/sort/by/date/desc`);
  };

  const handleDateAsc = () => {
    setActiveButton("asc");
    setCurrentPage(1);
    setCurrentEndpoint(`/api/admin/pda/item/sort/by/date/asc`);
  };

  const handleUser = () => {
    setActiveButton("user");
    setCurrentPage(1);
  };

  const handlePaymeSort = () => {
    setActiveButton("payme");
    setCurrentPage(1);
    setCurrentEndpoint(`/api/admin/pda/item/sort/by/payment`);
  };

  const handleCountSort = () => {
    setActiveButton("count");
    setCurrentPage(1);
    setCurrentEndpoint(`/api/admin/pda/item/sort/by/count`);
  };

  const handleDateRangeFilter = () => {
    setActiveButton("dateRage");
    if (dateFrom && dateTo) {
      setCurrentEndpoint(
        `/api/admin/pda/item/sort/by/date?from=${dateFrom}&to=${dateTo}`
      );
    } else {
      message.warning("Iltimos, sanani kiriting");
    }
  };

  useEffect(() => {
    if (activeButton === "user") {
      fetchUserData();
    } else {
      fetchData(currentEndpoint);
    }
  }, [currentPage, currentEndpoint, activeButton]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <FiltersHeader
        handleCountSort={handleCountSort}
        handlePaymeSort={handlePaymeSort}
        handleDateAsc={handleDateAsc}
        handleDateDesc={handleDateDesc}
        handleRegionChange={handleRegionChange}
        region={region}
        activeButton={activeButton}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        dateTo={dateTo}
        dateFrom={dateFrom}
        handleDateRangeFilter={handleDateRangeFilter}
        handleUser={handleUser}
      />
      <div className="hidden md:flex justify-end my-5">
        <Segmented
          value={segmentValue}
          className="p-2 bg-gray-100"
          onChange={(e) => setSegmentValue(e)}
          options={[
            {
              value: "list",
              icon: <HiMiniBars3 size={18} className="mt-1" />,
            },
            {
              value: "app",
              icon: <AiOutlineAppstore size={18} className="mt-1" />,
            },
          ]}
        />
      </div>
      {loading ? (
        <div className="flex justify-center mt-10 text-4xl">
          <Loader />
        </div>
      ) : data && data.length > 0 ? (
        <>
          {segmentValue === "list" ? (
            <>
              <FiltersLists
                data={data}
                activeButton={activeButton}
                fetchUserData={fetchUserData}
              />
            </>
          ) : (
            <>
              <FiltersCards data={data} />
            </>
          )}
          <div
            className="flex justify-center mb-56 mt-10 md:mb-0 md:mt-5"
            css={paginationStyle}
          >
            <Pagination
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center p-8">
          <div className="mt-10 w-full ">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-xl" />
          </div>
        </div>
      )}
    </>
  );
});
