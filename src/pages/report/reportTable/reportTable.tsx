import { ReportList } from "../reportList/reportList";
import { useEffect, useState } from "react";
import baseURL from "../../../utils/api";
import { Button, Input, Segmented, Typography } from "antd";
import { Loader } from "../../../components";
import { LuSearch } from "react-icons/lu";
import { ReportCard } from "../reportCard/reportCard";
import { HiMiniBars3 } from "react-icons/hi2";
import { AiOutlineAppstore } from "react-icons/ai";

interface IReportList {
  address: string | number;
  count: string | number;
  full_name?: string | number;
  phone?: string | string | number;
  price?: string | number;
  user_id?: string | number;
  weight?: string | number;
}

interface IReportData {
  by_weight: IReportList[];
  by_count: IReportList[];
  by_price: IReportList[];
  by_province: IReportList[];
}

export const ReportTable = () => {
  const [loading, setLoading] = useState(false);
  const [dataCourse, setDataCourse] = useState<IReportData | null>(null);
  const [count, setCount] = useState(10);
  const [searchValue, setSearchValue] = useState<number>();
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

  useEffect(() => {
    fetchData();
  }, [count]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await baseURL.get(`/api/client/dashboard/report/${count}`);
      console.log(res.data);
      setDataCourse(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCount(Number(searchValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="mt-7 flex gap-2 items-center">
        <div className="bg-white flex gap-2 items-center rounded-full w-full md:w-72 h-12 md:h-11 px-3 shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
          <Input
            type="number"
            placeholder="data miqdori"
            value={searchValue}
            onChange={(e) => setSearchValue(Number(e.target.value))}
            className="border-none text-lg"
            onKeyDown={handleKeyDown}
          />
          <Button className="border-none" onClick={handleSearch}>
            <LuSearch size={25} color="#FE5222" />
          </Button>
        </div>
      </div>
      <div className="hidden md:flex justify-end me-3">
        <Segmented
          value={segmentValue}
          className="p-1 bg-gray-100 mb-2"
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
        <div className="md:mt-0 mt-10">
          <Loader />
        </div>
      ) : (
        <div className="!pb-40 md:!pb-0 p-2">
          {dataCourse &&
            Object.entries(dataCourse).map(([category, data]) => {
              let title = category.replace("_", " ").toUpperCase();
              if (category === "by_weight") {
                title = "Eng vazni og'irlari";
              } else if (category === "by_count") {
                title = "Eng Ko'p Sotib olgan foydalanuvchilar";
              } else if (category === "by_price") {
                title = "Eng ko'p Kargo to'lov qilganlar ";
              } else if (category === "by_province") {
                title = "Eng ko'p mahsulot sotib olgan viloyatlar";
              }

              return (
                <div key={category} className="mb-10 md:mt-0 mt-5">
                  <Typography.Title
                    level={4}
                    className="!text-green-600 font-semibold p-3 rounded-t-lg bg-gray-200 !m-0 text-center py-4"
                  >
                    {title}
                  </Typography.Title>
                  {segmentValue === "list" ? (
                    <>
                      <ReportList dataCourse={data} category={category} />
                    </>
                  ) : (
                    <>
                      <ReportCard dataCourse={data} category={category} />
                    </>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
