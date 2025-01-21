/** @jsxImportSource @emotion/react */
import { Col, Empty, Row, Spin, Pagination } from "antd";
import { useEffect, useState } from "react";
import baseURL from "../../utils/api";
import { IDashboards } from "../../types/types";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ArxiveCards } from "./arxiveCards/arxiveCards";
import searchStore from "../../store/searchStore";
import { paginationStyle } from "../../components/paginationStyles/paginationStyles";

export const Arxive = observer(() => {
  const [data, setData] = useState<IDashboards[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const search = searchStore.searchArxive;
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(currentPage);
  }, [search, currentPage]);

  const fetchData = async (page: number) => {
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
        console.log(search);

        res = await baseURL.get(
          `/api/client/dashboard/all/delivered/archive/${search}?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        res = await baseURL.get(
          `/api/client/dashboard/all/delivered/archive?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (res?.data?.data?.data.dashboards) {
        console.log(res.data.data.total_items);

        const dashboards = res.data.data.data.dashboards;
        setData(Array.isArray(dashboards) ? dashboards : []);
        setTotalItems(res.data.data.total_items);
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
      <Row gutter={[20, 20]} className="flex justify-center items-center">
        {isLoading ? (
          <Spin size="large" />
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
                {data.map((item) => (
                  <Col span={8} key={item.id}>
                    <ArxiveCards item={item} />
                  </Col>
                ))}
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
