/** @jsxImportSource @emotion/react */
import { Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { CardItems } from "../cardItems/cardItems";
import api from "../../../utils/api";
import searchStore from "../../../store/store";
import { observer } from "mobx-react-lite";
interface MyComponentProps {
  setTotalPaymentFee: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

export const Cards: React.FC<MyComponentProps> = observer(
  ({ setTotalPaymentFee, setTotalPrice }) => {
    const [loading, setLoading] = useState(true);
    const [dataCourse, setDataCourse] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPaidByCard, setTotalPaidByCard] = useState(0);
    const [totalPaidByCash, setTotalPaidByCash] = useState(0);
    const [totalPaidByPayme, setTotalPaidByPayme] = useState(0);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    useEffect(() => {
      setTotalPrice(totalPaidByCard + totalPaidByCash + totalPaidByPayme);
    }, [totalPaidByCard, totalPaidByCash, totalPaidByPayme]);

    const search = searchStore.searchDashboard;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing");
          return;
        }
        setLoading(true);

        let response;

        if (search) {
          response = await api.get(`/api/client/dashboard/all/${search}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              Connection: "keep-alive",
              "ngrok-skip-browser-warning": "true",
            },
            timeout: 10000,
          });
          const dashboards = response.data.data.dashboards;

          setTotalPaidByCard(
            dashboards.reduce(
              (acc: number, dashboard) => acc + dashboard.paid_by_card,
              0
            )
          );
          setTotalPaidByCash(
            dashboards.reduce(
              (acc: number, dashboard) => acc + dashboard.paid_by_cash,
              0
            )
          );
          setTotalPaidByPayme(
            dashboards.reduce(
              (acc: number, dashboard) => acc + dashboard.paid_by_payme,
              0
            )
          );
          setTotalPaymentFee(
            dashboards.reduce(
              (acc: number, dashboard) => acc + dashboard.payment_fee,
              0
            )
          );
        } else {
          response = await api.get(`/api/client/dashboard`, {
            params: {
              page: currentPage,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
              Connection: "keep-alive",
              "ngrok-skip-browser-warning": "true",
            },
            timeout: 10000,
          });
          setTotalPaidByCard(0);
          setTotalPaidByCash(0);
          setTotalPaidByPayme(0);
          setTotalPaymentFee(0);
          setTotalPrice(0);
        }
        console.log(response.data.data.dashboards);
        setDataCourse(response.data.data.dashboards);
        setTotalItems(
          response.data.total_items ? response.data.total_items : 0
        );
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [currentPage, search]);
    return (
      <>
        <div
          className=" flex gap-3 items-center bg-white rounded-xl p-4"
          style={{
            boxShadow: "0px 0px 30px -10px rgba(34, 60, 80, 0.38)",
          }}
        >
          <div className="w-[33%] text-2xl font-bold ps-5 border-r flex gap-10">
            <div>Karta orqali to’lovlar</div>
            <div className="border-s ps-5">{totalPaidByCard}</div>
          </div>
          <div className="w-[33%] text-2xl font-bold ps-5 border-r flex gap-10">
            <div>Naqd orqali to’lovlar</div>
            <div className="border-s ps-5">{totalPaidByCash}</div>
          </div>{" "}
          <div className="w-[33%] text-2xl font-bold ps-5 flex gap-10">
            <div>Payme orqali to’lovlar</div>
            <div className="border-s ps-5">{totalPaidByPayme}</div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center mt-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <CardItems dataCourse={dataCourse} fetchData={fetchData} />
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
