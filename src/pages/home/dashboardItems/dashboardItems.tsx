/** @jsxImportSource @emotion/react */
import { Empty, Pagination, Segmented } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import baseURL from "../../../utils/api";
import searchStore from "../../../store/searchStore";
import { observer } from "mobx-react-lite";
import { IDashboards } from "../../../types/types";
import { SearchPaymeInput } from "../searchPaymeInput/searchPaymeInput";
import { useNavigate } from "react-router-dom";
import { handleSelect } from "../../../utils/dashboardFunctions/selectUtils";
import { resetTotals } from "../../../utils/dashboardFunctions/totalUtils";
import { DashboardHeaderMobile } from "../../../components/headers";
import { Loader, paginationStyle, priceFormatter } from "../../../components";
import { HiMiniBars3 } from "react-icons/hi2";
import { AiOutlineAppstore } from "react-icons/ai";
import { CardItems, CardItemsMobile } from "../card";
import { ListItems } from "../list";

export const DashboardItems = observer(
  ({
    setTotalPaymentFee,
    setTotalPrice,
    residual,
  }: {
    setTotalPaymentFee: Dispatch<SetStateAction<number>>;
    setTotalPrice: Dispatch<SetStateAction<number>>;
    residual: number;
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
    const [segmentValue, setSegmentValue] = useState("list");

    const search = searchStore?.searchDashboard;

    const navigate = useNavigate();

    const handleItemsSelect = (id: number) => {
      handleSelect(
        id,
        selectedItems,
        setSelectedItems,
        dataCourse,
        setTotalPaidByCard,
        setTotalPaidByCash,
        setTotalPaidByPayme,
        setTotalPaymentFee,
        setTotalPaidByDiscount,
        setTotalPrice
      );
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
      try {
        const response = await baseURL.get(
          `/api/client/dashboard/all/${search}`,
          {
            headers: getHeaders(token),
            timeout: 10000,
          }
        );
        console.log(response.data.data, "Dashboard search data");

        if (
          !response.data?.data.data?.dashboards ||
          response.data.data.data.dashboards.length === 0
        ) {
          setDataCourse([]);
          setTotalItems(0);
          setAggregatedTotals([]);
          return;
        }

        const dashboards = response.data.data.data.dashboards;
        setDataCourse(dashboards);
        setTotalItems(response.data.data.total_items ?? 0);
        setAggregatedTotals(dashboards);
      } catch (error) {
        console.error("Search error:", error);
        setDataCourse([]);
        setTotalItems(0);
        setAggregatedTotals([]);
      }
    };
    const fetchDashboardData = async (token: string) => {
      setIsHeaderInput(false);
      const response = await baseURL.get(`/api/client/dashboard`, {
        params: { page: currentPage },
        headers: getHeaders(token),
        timeout: 10000,
      });
      console.log(response.data.data, "Dashboard data");

      setDataCourse(response.data.data.dashboards);
      setTotalItems(response.data.total_items ?? 0);

      handleDeselectAll();
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
    const handleDeselectAll = () => {
      resetTotals(
        setTotalPaidByCard,
        setTotalPaidByCash,
        setTotalPaidByPayme,
        setTotalPaymentFee,
        setTotalPrice,
        setTotalPaidByDiscount
      );
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
        <div className="block md:hidden pt-2">
          <DashboardHeaderMobile />
        </div>
        <div className="hidden md:block">
          {isHeaderInput ? (
            <>
              <SearchPaymeInput
                isSelected={selectedItems}
                setSelectedItems={setSelectedItems}
                userId={userId}
                searchId={search}
                fetchData={fetchData}
                dataCourse={dataCourse}
                residual={residual}
              />
            </>
          ) : (
            <>
              <div className="hidden md:flex gap-3 items-center bg-white rounded-xl p-4 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
                <div className="w-[33%] text-2xl font-bold ps-5 border-r flex gap-10">
                  <div>Karta orqali to'lovlar</div>
                  <div className="border-s ps-5">
                    {priceFormatter(totalPaidByCard)}
                  </div>
                </div>
                <div className="w-[33%] text-2xl font-bold ps-5 border-r flex gap-10">
                  <div>Naqd orqali to'lovlar</div>
                  <div className="border-s ps-5">
                    {priceFormatter(totalPaidByCash)}
                  </div>
                </div>
                <div className="w-[33%] text-2xl font-bold ps-5 flex gap-10">
                  <div>Payme orqali to'lovlar</div>
                  <div className="border-s ps-5">
                    {priceFormatter(totalPaidByPayme)}
                  </div>
                </div>
                <div>
                  <Segmented
                    value={segmentValue}
                    className="p-1"
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
              </div>
            </>
          )}
        </div>
        {loading ? (
          <div className="flex justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <>
            {!dataCourse || dataCourse.length === 0 ? (
              <>
                <div className="flex justify-center p-8">
                  <div className="mt-10 w-full">
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      className="text-xl"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {segmentValue === "list" ? (
                  <div className="hidden md:block">
                    <ListItems
                      dataCourse={dataCourse}
                      isSelected={selectedItems}
                      onSelect={handleItemsSelect}
                      setUserId={setUserId}
                      fetchData={fetchData}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mt-5 hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 ">
                      <CardItems
                        dataCourse={dataCourse}
                        fetchData={fetchData}
                        isSelected={selectedItems}
                        onSelect={handleItemsSelect}
                        setUserId={setUserId}
                      />
                    </div>
                  </>
                )}

                <div className="block md:hidden px-1">
                  <CardItemsMobile dataCourse={dataCourse} />
                </div>

                <div
                  className="flex justify-center md:mb-0 mb-56 mt-5 "
                  css={paginationStyle}
                >
                  <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    total={totalItems}
                    pageSize={20}
                    onChange={handlePageChange}
                    showSizeChanger={false}
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
