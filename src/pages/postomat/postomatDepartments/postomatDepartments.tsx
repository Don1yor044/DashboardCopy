import { Button, Col, Empty, Row, Spin } from "antd";
import { PostomatDepartmentsCards } from "../postomatDepartmentsCards/postomatDepartmentsCards";
import { useEffect, useState } from "react";
import baseURL from "../../../utils/api";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export const PostomatDepartments = () => {
  const [dataCourse, setDataCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await baseURL.get(`/api/admin/locker/cell`);
      console.log(res.data.data);
      setDataCourse(res.data.data);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
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
      {loading ? (
        <>
          <div className="text-center mt-12">
            <Spin size="large" />
          </div>
        </>
      ) : dataCourse.length > 0 ? (
        <>
          <Row gutter={[20, 20]} className="mt-10">
            {dataCourse.map((item, index) => (
              <Col xl={6} span={12} key={index}>
                <PostomatDepartmentsCards item={item} />
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
