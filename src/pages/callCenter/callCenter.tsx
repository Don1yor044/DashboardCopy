import { Button, Input, Table } from "antd";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import baseURL from "../../utils/api";
import { errorToast } from "../../components/toastManager";
import { useNavigate } from "react-router-dom";
import { tableColumns } from "./callCenterColumns/callCenterColumns";
import { Loader } from "../../components";
import { CallCenterStatus } from "./callCenterStatus/callCenterStatus";
import {
  CallCenterShippedStatus,
  CallCenterShippedStatusProps,
} from "./callCenterShippedStatus/callCenterShippedStatus";

export const CallCenter = () => {
  const [status, setStatus] = useState(0);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [allNumber, setAllNumber] = useState(0);
  const [pendingNumber, setPendingNumber] = useState(0);
  const [paidNumber, setPaidNumber] = useState(0);
  const [deliveredNumber, setDeliveredNumber] = useState(0);
  const [receivedNumber, setReceivedNumber] = useState(0);
  const [invalidNumber, setInvalidNumber] = useState(0);
  const [exceptionalNumber, setexceptionalNumber] = useState(0);
  const [shippedNumber, setShippedNumber] = useState(0);
  const [subStatus, setSubStatus] = useState(0);
  const [subStatusSort, setSubStatusSort] = useState<
    CallCenterShippedStatusProps["subStatusSort"]
  >({
    onLine: 0,
    onUZ: 0,
    uzShipped: 0,
    onStation: 0,
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) {
    errorToast("Iltimos, tizimga kiring!");
    navigate("/");
  }
  useEffect(() => {
    fetchData(status, searchQuery);
  }, [status, searchQuery, subStatus]);

  useEffect(() => {
    if (search.length === 0) {
      fetchData(status, "");
    }
  }, [search]);

  const fetchData = async (status: number, searchQuery: string) => {
    if (status === 4) {
      await shippedFetch();
    } else {
      try {
        setLoading(true);
        const res = await baseURL.get(
          `/api/custom/orders?page=1&size=10&status=${status}&keyword=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sort = await baseURL.get(
          `/api/custom/orders/order-counts?page=1&size=10&status=${status}&keyword=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const {
          all,
          pending,
          paid,
          delivered,
          received,
          invalid,
          exceptional,
          shipped,
        } = sort.data.data || {};

        setAllNumber(all || 0);
        setPendingNumber(pending || 0);
        setPaidNumber(paid || 0);
        setDeliveredNumber(delivered || 0);
        setReceivedNumber(received || 0);
        setInvalidNumber(invalid || 0);
        setexceptionalNumber(exceptional || 0);
        setShippedNumber(shipped || 0);

        console.log(sort.data.data, "sort");
        console.log(res.data.data, "data");

        setData(res.data.data);
        // console.log(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const shippedFetch = async () => {
    setLoading(true);
    try {
      const res = await baseURL.get(
        `/api/custom/orders?page=1&size=10&status=4&keyword=${searchQuery}&sub_status=${subStatus}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const sort = await baseURL.get(
        `/api/custom/orders/sub-order-counts?page=1&size=10&status=4&keyword=${searchQuery}`
      );
      setSubStatusSort(sort.data.data);
      console.log(sort.data.data, "sort");

      setData(res.data.data);
      console.log(res.data.data, "Shipped");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setSearchQuery(search);
      fetchData(status, search);
    }
  };
  const handleAppOpen = () => {
    const appUrl = "https://app.abusahiy.uz";
    window.location.href = appUrl;
  };

  const handleIos = () => {
    // App Store-ga o'tish uchun havola
    window.location.href =
      "https://apps.apple.com/uz/app/abu-sahiy/id6499200131"; // Misol: App Store havolasi
  };
  const handleAndroid = () => {
    // App Store-ga o'tish uchun havola
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.abusahiy.shop&hl=ru"; // Misol: App Store havolasi
  };
  return (
    <>
      <div className="flex gap-5 items-center">
        <div className="bg-white w-[30%] flex gap-2 items-center rounded-full h-14 px-5 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
          <Input
            allowClear
            placeholder="User_id Qidiruv..."
            className="border-none text-xl"
            onKeyDown={handleKeyPress}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            type="text"
            className="p-5"
            onClick={() => setSearchQuery(search)}
          >
            <LuSearch size={27} color="#FE5222" />
          </Button>
        </div>
      </div>
      <div>
        <Button onClick={handleAppOpen}>App Open</Button>
        <Button onClick={handleIos}>iOS</Button>
        <Button onClick={handleAndroid}>Andriod</Button>
      </div>
      <CallCenterStatus
        status={status}
        setStatus={setStatus}
        allNumber={allNumber}
        pendingNumber={pendingNumber}
        paidNumber={paidNumber}
        deliveredNumber={deliveredNumber}
        shippedNumber={shippedNumber}
        receivedNumber={receivedNumber}
        invalidNumber={invalidNumber}
        exceptionalNumber={exceptionalNumber}
      />
      {status === 4 && (
        <>
          <CallCenterShippedStatus
            subStatus={subStatus}
            setSubStatus={setSubStatus}
            subStatusSort={subStatusSort}
          />
        </>
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-10">
            <Table
              dataSource={data}
              columns={tableColumns}
              pagination={false}
              className="shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] rounded-t-xl"
              scroll={{ x: 2500 }}
            />
          </div>
        </>
      )}{" "}
    </>
  );
};
