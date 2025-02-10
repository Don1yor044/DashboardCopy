import { Col, Empty, Row } from "antd";
import { PostomatCards } from "./postomatCards/postomatCards";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import baseURL from "../../utils/api";
export const Postomat = () => {
  const [loading, setLoading] = useState(false);
  const [dataCourse, setDataCourse] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await baseURL.get("/api/admin/locker/");
      console.log(res.data.data, "res");
      setDataCourse(res.data.data);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <div className="text-center mt-12">
          <Loader />
        </div>
      ) : dataCourse.length > 0 ? (
        <Row gutter={[20, 20]} className="mt-10 mb-40 md:mb-0">
          {dataCourse.map((item, index) => (
            <Col
              xl={6}
              span={24}
              key={index}
              className="cursor-pointer"
              onClick={() => navigate("/departments")}
            >
              <PostomatCards item={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="flex justify-center">
          <div className="mt-10 w-full ">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Tez kunda"
              className="text-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};
