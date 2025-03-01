import { Button, Col, Empty, Grid, Row } from "antd";
import { PostomatDepartmentsCards } from "../postomatDepartmentsCards/postomatDepartmentsCards";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components";
import baseURL from "../../../utils/api";

const { useBreakpoint } = Grid;

export const PostomatDepartments = () => {
  const [activeBlock, setActiveBlock] = useState("01");
  const [originalDataCourse, setOriginalDataCourse] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const screens = useBreakpoint();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await baseURL.get(`/api/admin/locker/cell`);
      console.log(res.data.data);
      setOriginalDataCourse(res.data.data);
      const filteredData = res.data.data.filter(
        (item: { block_number: string }) => item.block_number === "01"
      );
      setDataCourse(filteredData);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockChange = (blockNumber: string) => {
    setActiveBlock(blockNumber);
    const filteredData = originalDataCourse.filter(
      (item: { block_number: string }) => item.block_number === blockNumber
    );
    setDataCourse(filteredData);
  };

  return (
    <>
      <div className="mt-5">
        <Button
          onClick={() => navigate("/postomat")}
          className="rounded-xl text-[#54571]"
        >
          <IoMdArrowRoundBack />
          Orqaga
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-semibold mt-5 ps-2">
          Postomat bo'limlari
        </h1>
        <div className="flex gap-10 mt-5 justify-center my-5">
          <Button
            className={`text-xl font-semibold border-2 border-black rounded-md p-6 transition ${
              activeBlock === "01"
                ? "border-2 border-blue-700 text-blue-700"
                : "bg-white text-black"
            }`}
            onClick={() => handleBlockChange("01")}
          >
            1 - block
          </Button>
          <Button
            className={`text-xl font-semibold border-2 border-black rounded-md p-6 transition ${
              activeBlock === "02"
                ? "border-2 border-blue-700 text-blue-700"
                : "bg-white text-black"
            }`}
            onClick={() => handleBlockChange("02")}
          >
            2 - block
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-12">
          <Loader />
        </div>
      ) : dataCourse.length > 0 ? (
        <div className="px-1 md:px-5">
          <Row
            gutter={screens.md ? [50, 10] : [0, 10]}
            className="mt-0 md:mt-10 mb-40 md:mb-0 md:flex justify-center"
          >
            {dataCourse.map((item, index) => (
              <Col span={12} md={10} key={index}>
                <div className="p-1">
                  <PostomatDepartmentsCards
                    item={item}
                    dataCourse={dataCourse}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="flex justify-center p-8">
          <div className="mt-10 w-full ">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-xl" />
          </div>
        </div>
      )}
    </>
  );
};
