/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import baseURL from "../../utils/api";
import { Empty, Pagination, Spin } from "antd";
import { DiscountedCards } from "./discountedCards/discountedCards";
import { DiscountedHeader } from "./discountedHeader/discountedHeader";
import { paginationStyle } from "../../components/paginationStyles/paginationStyles";

export const Discounted = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDiscounted, setSearchDiscounted] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    discount();
  }, []);
  const discount = async () => {
    setLoading(true);
    try {
      const res = await baseURL.get(
        `/api/client/dashboard/discounted/orders/`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      console.log(res.data.data);
      if (res.data.data.data?.dashboards) {
        setData(res.data.data.data.dashboards);
      }
      setTotalItems(res.data.data.total_items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <DiscountedHeader
        searchDiscounted={searchDiscounted}
        setSearchDiscounted={setSearchDiscounted}
      />
      {loading ? (
        <div className="flex justify-center mt-10">
          <Spin size="large" />
        </div>
      ) : data.length === 0 ? (
        <div className="mt-10">
          <Empty />
        </div>
      ) : (
        <>
          {searchDiscounted}
          <DiscountedCards data={data} />
        </>
      )}
      <div className="flex justify-center mt-5" css={paginationStyle}>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={10}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};
