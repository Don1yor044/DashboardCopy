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
      block_number: 2,
      cell_number: 2,
      locker_id: 2,
    },
    {
      id: 3,
      status: 2,
      block_number: 3,
      cell_number: 3,
      locker_id: 3,
    },
    {
      id: 4,
      status: 1,
      block_number: 4,
      cell_number: 4,
      locker_id: 4,
    },
    {
      id: 5,
      status: 2,
      block_number: 5,
      cell_number: 5,
      locker_id: 5,
    },
    {
      id: 6,
      status: 2,
      block_number: 6,
      cell_number: 6,
      locker_id: 6,
    },
    {
      id: 7,
      status: 2,
      block_number: 7,
      cell_number: 7,
      locker_id: 7,
    },
    {
      id: 8,
      status: 2,
      block_number: 8,
      cell_number: 8,
      locker_id: 8,
    },
  ];
  const [dataCourse] = useState(data);
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
      {loading ? (
        <>
          <div className="text-center mt-12">
            <Spin size="large" />
          </div>
        </>
      ) : dataCourse.length > 0 ? (
        <>
          <Row gutter={[10, 10]} className="mt-10 mb-40 md:mb-0">
            {dataCourse.map((item) => (
              <Col xl={6} span={12} key={item.id}>
                <div className="p-1">
                  <PostomatDepartmentsCards item={item} />
                </div>
              </Col>
            ))}
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
