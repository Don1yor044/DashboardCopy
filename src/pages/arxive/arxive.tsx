/** @jsxImportSource @emotion/react */
import { Col, Empty, Row, Pagination, Segmented, DatePicker } from "antd";
import { useEffect, useState } from "react";
import baseURL from "../../utils/api";
import { IDashboards } from "../../types/types";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ArxiveCards } from "./arxiveCards/arxiveCards";
import searchStore from "../../store/searchStore";
import { paginationStyle } from "../../components/paginationStyles/paginationStyles";
import { HiMiniBars3 } from "react-icons/hi2";
import { AiOutlineAppstore } from "react-icons/ai";
import { ArxiveList } from "./arxiveList/arxiveList";
import dayjs from "dayjs";
import { Loader } from "../../components";
const { RangePicker } = DatePicker;

export const Arxive = observer(() => {
  const [data, setData] = useState<IDashboards[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [segmentValue, setSegmentValue] = useState("list");
  const [dates, setDates] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().startOf("day"),
    dayjs().endOf("day"),
  ]);

  const search = searchStore.searchArxive;
  const navigate = useNavigate();

  const handleDateChange = (
    value: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  ) => {
    if (value && value[0] && value[1]) {
      setDates([value[0], value[1]]);
      fetchData(
        currentPage,
        value[0].format("YYYY-MM-DD HH:mm:ss"),
        value[1].format("YYYY-MM-DD HH:mm:ss")
      );
    }
  };

  useEffect(() => {
    const startDate = dates[0].format("YYYY-MM-DD HH:mm:ss");
    const endDate = dates[1].format("YYYY-MM-DD HH:mm:ss");
    fetchData(currentPage, startDate, endDate);
  }, [search, currentPage]);

  const fetchData = async (
    page: number,
    startDate: string,
    endDate: string
  ) => {
    setIsloading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      navigate("/");
      return;
    }
    let res;
    try {
      if (search) {
        res = await baseURL.get(
          `/api/client/dashboard/all/delivered/archive/${search}?page=${page}&from=${startDate}&to=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await baseURL.get(
          `/api/client/dashboard/all/delivered/archive?page=${page}&from=${startDate}&to=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log(res.data.data, "Arxive Data");
      if (res?.data?.data.data?.dashboards) {
        const dashboards = res.data.data.data?.dashboards;

        setData(Array.isArray(dashboards) ? dashboards : []);
        setTotalItems(res.data.data.total_pages);
      } else {
        setData([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("API chaqiruvi xato: ", error);
    } finally {
      setIsloading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5 ">
        <div>
          <RangePicker
            value={dates}
            onChange={handleDateChange}
            placeholder={["Boshalanishi", "Tugashi"]}
            className="p-2 text-xl"
            format="YYYY-MM-DD HH:mm:ss"
            showTime
          />
        </div>
        <div>
          <Segmented
            value={segmentValue}
            className="p-2 bg-gray-100"
            onChange={(e) => setSegmentValue(e)}
            options={[
              {
                value: "list",
                icon: <HiMiniBars3 size={20} className="mt-1" />,
              },
              {
                value: "app",
                icon: <AiOutlineAppstore size={20} className="mt-1" />,
              },
            ]}
          />
        </div>
      </div>
      <Row gutter={[20, 20]} className="flex justify-center items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data.length === 0 ? (
              <div className="mt-10">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  className="text-xl"
                />
              </div>
            ) : (
              <>
                {segmentValue === "list" ? (
                  <>
                    <ArxiveList data={data} />
                  </>
                ) : (
                  <>
                    {data.map((item) => (
                      <Col span={8} key={item.id}>
                        <ArxiveCards item={item} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Row>

      <div className="flex justify-center mt-5" css={paginationStyle}>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={1}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
});
