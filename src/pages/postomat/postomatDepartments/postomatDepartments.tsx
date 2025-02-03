import { Button, Col, Empty, Row, Spin } from "antd";
import { PostomatDepartmentsCards } from "../postomatDepartmentsCards/postomatDepartmentsCards";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export const PostomatDepartments = () => {
  const data = [
    {
      id: 1,
      status: 1,
      block_number: 1,
      cell_number: 1,
      locker_id: 1,
    },
    {
      id: 2,
      status: 2,
      block_number: 1,
      cell_number: 2,
      locker_id: 2,
    },
    {
      id: 3,
      status: 2,
      block_number: 1,
      cell_number: 3,
      locker_id: 3,
    },
    {
      id: 4,
      status: 1,
      block_number: 1,
      cell_number: 4,
      locker_id: 4,
    },
    {
      id: 5,
      status: 1,
      block_number: 1,
      cell_number: 5,
      locker_id: 5,
    },
    {
      id: 6,
      status: 2,
      block_number: 1,
      cell_number: 6,
      locker_id: 6,
    },
    {
      id: 7,
      status: 2,
      block_number: 1,
      cell_number: 7,
      locker_id: 7,
    },
    {
      id: 8,
      status: 2,
      block_number: 1,
      cell_number: 8,
      locker_id: 8,
    },
    {
      id: 9,
      status: 1,
      block_number: 1,
      cell_number: 9,
      locker_id: 9,
    },
    {
      id: 10,
      status: 2,
      block_number: 1,
      cell_number: 10,
      locker_id: 10,
    },
    {
      id: 11,
      status: 2,
      block_number: 1,
      cell_number: 11,
      locker_id: 11,
    },
    {
      id: 12,
      status: 2,
      block_number: 1,
      cell_number: 12,
      locker_id: 12,
    },

    {
      id: 13,
      status: 2,
      block_number: 1,
      cell_number: 13,
      locker_id: 13,
    },
    {
      id: 14,
      status: 1,
      block_number: 1,
      cell_number: 14,
      locker_id: 14,
    },
    {
      id: 15,
      status: 1,
      block_number: 1,
      cell_number: 15,
      locker_id: 15,
    },
    {
      id: 16,
      status: 2,
      block_number: 1,
      cell_number: 16,
      locker_id: 16,
    },
    {
      id: 17,
      status: 2,
      block_number: 1,
      cell_number: 17,
      locker_id: 17,
    },
    {
      id: 18,
      status: 1,
      block_number: 1,
      cell_number: 18,
      locker_id: 18,
    },
    {
      id: 19,
      status: 1,
      block_number: 1,
      cell_number: 19,
      locker_id: 19,
    },
    {
      id: 20,
      status: 1,
      block_number: 1,
      cell_number: 20,
      locker_id: 20,
    },
    {
      id: 21,
      status: 2,
      block_number: 1,
      cell_number: 21,
      locker_id: 21,
    },
    {
      id: 22,
      status: 1,
      block_number: 1,
      cell_number: 22,
      locker_id: 22,
    },
  ];
  const data2 = [
    {
      id: 1,
      status: 2,
      block_number: 2,
      cell_number: 1,
      locker_id: 1,
    },
    {
      id: 2,
      status: 1,
      block_number: 2,
      cell_number: 2,
      locker_id: 2,
    },
    {
      id: 3,
      status: 1,
      block_number: 2,
      cell_number: 3,
      locker_id: 3,
    },
    {
      id: 4,
      status: 2,
      block_number: 2,
      cell_number: 4,
      locker_id: 4,
    },
    {
      id: 5,
      status: 2,
      block_number: 2,
      cell_number: 5,
      locker_id: 5,
    },
    {
      id: 6,
      status: 1,
      block_number: 2,
      cell_number: 6,
      locker_id: 6,
    },
    {
      id: 7,
      status: 1,
      block_number: 2,
      cell_number: 7,
      locker_id: 7,
    },
    {
      id: 8,
      status: 1,
      block_number: 2,
      cell_number: 8,
      locker_id: 8,
    },
    {
      id: 9,
      status: 2,
      block_number: 2,
      cell_number: 9,
      locker_id: 9,
    },
    {
      id: 10,
      status: 1,
      block_number: 2,
      cell_number: 10,
      locker_id: 10,
    },
    {
      id: 11,
      status: 1,
      block_number: 2,
      cell_number: 11,
      locker_id: 11,
    },
    {
      id: 12,
      status: 1,
      block_number: 2,
      cell_number: 12,
      locker_id: 12,
    },

    {
      id: 13,
      status: 2,
      block_number: 2,
      cell_number: 13,
      locker_id: 13,
    },
    {
      id: 14,
      status: 1,
      block_number: 2,
      cell_number: 14,
      locker_id: 14,
    },
    {
      id: 15,
      status: 1,
      block_number: 2,
      cell_number: 15,
      locker_id: 15,
    },
    {
      id: 16,
      status: 2,
      block_number: 2,
      cell_number: 16,
      locker_id: 16,
    },
    {
      id: 17,
      status: 2,
      block_number: 2,
      cell_number: 17,
      locker_id: 17,
    },
    {
      id: 18,
      status: 1,
      block_number: 2,
      cell_number: 18,
      locker_id: 18,
    },
    {
      id: 19,
      status: 1,
      block_number: 2,
      cell_number: 19,
      locker_id: 19,
    },
    {
      id: 20,
      status: 1,
      block_number: 2,
      cell_number: 20,
      locker_id: 20,
    },
    {
      id: 21,
      status: 2,
      block_number: 2,
      cell_number: 21,
      locker_id: 21,
    },
    {
      id: 22,
      status: 1,
      block_number: 2,
      cell_number: 22,
      locker_id: 22,
    },
  ];
  const [activeBlock, setActiveBlock] = useState(1);

  const [dataCourse, setDataCourse] = useState(data);
  const [loading] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await baseURL.get(`/api/admin/locker/cell`);
  //     console.log(res.data.data);
  //     setDataCourse(res.data.data);
  //   } catch (error) {
  //     console.log(error, "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleBlockChange = (blockNumber: number) => {
    setActiveBlock(blockNumber);
    setDataCourse(blockNumber === 1 ? data : data2);
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
          <h2
            className={`text-xl font-semibold border-2 border-black rounded-md p-2 transition ${
              activeBlock === 1
                ? "border-2 border-blue-700 text-blue-700"
                : "bg-white text-black"
            }`}
            onClick={() => handleBlockChange(1)}
          >
            1 - block
          </h2>{" "}
          <h2
            className={`text-xl font-semibold border-2 border-black rounded-md p-2 transition ${
              activeBlock === 2
                ? "border-2 border-blue-700 text-blue-700"
                : "bg-white text-black"
            }`}
            onClick={() => handleBlockChange(2)}
          >
            2 - block
          </h2>
        </div>
      </div>
      {loading ? (
        <>
          <div className="text-center mt-12">
            <Spin size="large" />
          </div>
        </>
      ) : dataCourse.length > 0 ? (
        <>
          <Row
            gutter={[0, 0]}
            className="mt-0 md:mt-10 mb-40 md:mb-0 md:flex  justify-center "
          >
            <Col xl={8} span={12}>
              {dataCourse.slice(0, 11).map((item) => (
                <div key={item.id} className="p-1">
                  <PostomatDepartmentsCards item={item} />
                </div>
              ))}
            </Col>
            <Col xl={8} span={12}>
              {dataCourse.slice(11).map((item) => (
                <div key={item.id} className="p-1">
                  <PostomatDepartmentsCards item={item} />
                </div>
              ))}
            </Col>
          </Row>
        </>
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
