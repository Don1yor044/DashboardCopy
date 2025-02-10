/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import baseURL from "../../utils/api";
import { Empty, Pagination } from "antd";
import { DiscountedCards } from "./discountedCards/discountedCards";
import { DiscountedHeader } from "./discountedHeader/discountedHeader";
import { paginationStyle } from "../../components/paginationStyles/paginationStyles";
import { errorToast } from "../../components/toastManager";
import { DiscountList } from "./discountedList/discountList";
import { useLocation } from "react-router-dom";
import { Loader } from "../../components";
import { IDashboards } from "../../types/types";

export const Discounted = () => {
  const [data, setData] = useState<IDashboards[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchDiscounted, setSearchDiscounted] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [segmentValue, setSegmentValue] = useState(
    window.innerWidth <= 768 ? "app" : "list"
  );
  const location = useLocation();
  const type = location.state?.type || "delivered";

  useEffect(() => {
    const handleResize = () => {
      setSegmentValue(window.innerWidth <= 768 ? "app" : "list");
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    discount();
  }, [searchDiscounted, currentPage, location.state?.type]);
  const discount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return errorToast("Token topilmadi !");
    }
    setLoading(true);

    let apiUrl = "";

    let sortByParam = "";

    if (type === "delivered") {
      apiUrl = "/api/client/dashboard/archive";
      sortByParam = "discounted_fee";
    } else if (type === "discounted") {
      apiUrl = "/api/client/dashboard/discounted/orders/";
    } else if (type === "cash") {
      apiUrl = "/api/client/dashboard/archive";
      sortByParam = " paid_by_cash";
    } else if (type === "card") {
      apiUrl = "/api/client/dashboard/archive";
      sortByParam = " paid_by_card";
    } else if (type === "payme") {
      apiUrl = "/api/client/dashboard/archive";
      sortByParam = " paid_by_payme ";
    }

    try {
      const res = await baseURL.get(apiUrl, {
        params: {
          sort_by_param: sortByParam,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let dataArray: IDashboards[];

      if (apiUrl == "/api/client/dashboard/discounted/orders/") {
        dataArray = Object.values(res.data.data.data.dashboards);
        setTotalItems(res.data.data.total_items);
      } else {
        dataArray = Object.values(res.data.data);
      }

      console.log(dataArray);

      setData(dataArray);
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
        segmentValue={segmentValue}
        setSegmentValue={setSegmentValue}
      />
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <div className="mt-10">
          <Empty />
        </div>
      ) : (
        <>
          {segmentValue === "list" ? (
            <>
              <DiscountList data={data} />
            </>
          ) : (
            <>
              <DiscountedCards data={data} />
            </>
          )}
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
