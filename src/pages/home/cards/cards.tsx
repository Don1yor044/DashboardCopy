/** @jsxImportSource @emotion/react */
import { Empty, Pagination, Spin } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { CardItems } from "../cardItems/cardItems";
import baseURL from "../../../utils/api";
import searchStore from "../../../store/store";
import { observer } from "mobx-react-lite";
import { IDashboards } from "../../../types/types";
import { SearchPaymeInput } from "../searchPaymeInput/searchPaymeInput";
import { useNavigate } from "react-router-dom";

export const Cards = observer(
  ({
    setTotalPaymentFee,
    setTotalPrice,
  }: {
    setTotalPaymentFee: Dispatch<SetStateAction<number>>;
    setTotalPrice: Dispatch<SetStateAction<number>>;
  }) => {
    const [loading, setLoading] = useState(true);
    const [dataCourse, setDataCourse] = useState<IDashboards[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPaidByCard, setTotalPaidByCard] = useState(0);
    const [totalPaidByCash, setTotalPaidByCash] = useState(0);
    const [totalPaidByPayme, setTotalPaidByPayme] = useState(0);
    const [totalPaidByDiscount, setTotalPaidByDiscount] = useState(0);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isHeaderInput, setIsHeaderInput] = useState(true);
    const [userId, setUserId] = useState<number>(0);
    const search = searchStore?.searchDashboard;

    const navigate = useNavigate();

    const handleSelect = (id: number) => {
      const newSelectedItems = selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id];

      setSelectedItems(newSelectedItems);

      if (newSelectedItems.length > 0) {
        const selectedDashboards = dataCourse.filter((item) =>
          newSelectedItems.includes(item.id)
        );

        const newTotalPaidByCard = selectedDashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.paid_by_card ?? 0),
          0
        );
        const newTotalPaidByCash = selectedDashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.paid_by_cash ?? 0),
          0
        );
        const newTotalPaidByPayme = selectedDashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.paid_by_payme ?? 0),
          0
        );
        const newTotalPaymentFee = selectedDashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.payment_fee ?? 0),
          0
        );

        const newTotalPaidByDiscount = selectedDashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.discounted_fee ?? 0),
          0
        );
        setTotalPaidByCard(newTotalPaidByCard);
        setTotalPaidByCash(newTotalPaidByCash);
        setTotalPaidByPayme(newTotalPaidByPayme);
        setTotalPaymentFee(newTotalPaymentFee);
        setTotalPaidByDiscount(newTotalPaidByDiscount);
      } else {
        resetTotals();
      }
    };
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    useEffect(() => {
      setTotalPrice(
        totalPaidByCard +
          totalPaidByCash +
          totalPaidByPayme +
          totalPaidByDiscount
      );
    }, [
      totalPaidByCard,
      totalPaidByCash,
      totalPaidByPayme,
      setTotalPrice,
      totalPaidByDiscount,
    ]);
    const fetchData = async () => {
      setIsHeaderInput(false);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing");
          navigate("/");

          return;
        }
        setLoading(true);

        if (search) {
          await fetchSearchResults(token);
        } else {
          await fetchDashboardData(token);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchSearchResults = async (token: string) => {
      setIsHeaderInput(true);
      const response = await baseURL.get(
        `/api/client/dashboard/all/${search}`,
        {
          headers: getHeaders(token),
          timeout: 10000,
        }
      );

      const dashboards = response.data.data.dashboards;

      setDataCourse(dashboards);
      setTotalItems(response.data.total_items ?? 0);

      setAggregatedTotals(dashboards);
    };
    const fetchDashboardData = async (token: string) => {
      setIsHeaderInput(false);
      const response = await baseURL.get(`/api/client/dashboard`, {
        params: { page: currentPage },
        headers: getHeaders(token),
        timeout: 10000,
      });
      console.log(response.data.data.dashboards, "data");

      setDataCourse(response.data.data.dashboards);
      setTotalItems(response.data.total_items ?? 0);

      resetTotals();
    };
    const setAggregatedTotals = (dashboards: IDashboards[]) => {
      if (!Array.isArray(dashboards) || dashboards.length === 0) {
        setTotalPaidByCard(0);
        setTotalPaidByCash(0);
        setTotalPaidByPayme(0);
        setTotalPaymentFee(0);
        setTotalPaidByDiscount(0);
        return;
      }

      setTotalPaidByCard(
        dashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.paid_by_card || 0),
          0
        )
      );

      setTotalPaidByCash(
        dashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.paid_by_cash || 0),
          0
        )
      );

      setTotalPaidByPayme(
        dashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.paid_by_payme || 0),
          0
        )
      );

      setTotalPaymentFee(
        dashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.payment_fee || 0),
          0
        )
      );
      setTotalPaidByDiscount(
        dashboards.reduce(
          (acc: number, dashboard) => acc + (dashboard.discounted_fee || 0),
          0
        )
      );
    };
    const resetTotals = () => {
      setTotalPaidByCard(0);
      setTotalPaidByCash(0);
      setTotalPaidByPayme(0);
      setTotalPaymentFee(0);
      setTotalPrice(0);
      setTotalPaidByDiscount(0);
    };
    const getHeaders = (token: string) => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    useEffect(() => {
      fetchData();
    }, [currentPage, search]);

    return (
      <>
        {isHeaderInput ? (
          <>
            <SearchPaymeInput
              isSelected={selectedItems}
              setSelectedItems={setSelectedItems}
              userId={userId}
              fetchData={fetchData}
            />
          </>
        ) : (
          <>
            <div className="flex gap-3 items-center bg-white rounded-xl p-4 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
              <div className="w-[33%] text-2xl font-bold ps-5 border-r flex gap-10">
                <div>Karta orqali to'lovlar</div>
                <div className="border-s ps-5">{totalPaidByCard}</div>
              </div>
              <div className="w-[33%] text-2xl font-bold ps-5 border-r flex gap-10">
                <div>Naqd orqali to'lovlar</div>
                <div className="border-s ps-5">{totalPaidByCash}</div>
              </div>
              <div className="w-[33%] text-2xl font-bold ps-5 flex gap-10">
                <div>Payme orqali to'lovlar</div>
                <div className="border-s ps-5">{totalPaidByPayme}</div>
              </div>
            </div>
          </>
        )}
        {loading ? (
          <div className="flex justify-center mt-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {!dataCourse || dataCourse.length === 0 ? (
              <div className="flex justify-center p-8">
                <div className="mt-10 w-full">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    className="text-xl"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <CardItems
                    dataCourse={dataCourse}
                    fetchData={fetchData}
                    isSelected={selectedItems}
                    onSelect={handleSelect}
                    setUserId={setUserId}
                  />
                </div>

                <div className="flex justify-center mt-5" css={paginationStyle}>
                  <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    total={totalItems}
                    pageSize={20}
                    onChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  }
);
const paginationStyle = css`
  .ant-pagination-item {
    background-color: white;
    color: #000;
  }

  .ant-pagination-item-active {
    background-color: #fe5222 !important;
    color: white !important;
    border: none !important;
    outline: none !important;
  }
  .ant-pagination-item-active a {
    color: white !important;
  }

  .ant-pagination-item:hover {
    background-color: #ffecdc;
    color: #fe5222;
  }
  .ant-select {
    display: none;
  }
`;
