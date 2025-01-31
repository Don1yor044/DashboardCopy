import { Col, Empty, Row, Spin } from "antd";
import { PostomatCards } from "./postomatCards/postomatCards";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Postomat = () => {
  const data = [
    {
      id: 1,
      name: "Toshkent City",
    },
    {
      id: 2,
      name: "Namangan City",
    },
    {
      id: 3,
      name: "Toshkent City 2",
    },
    {
      id: 4,
      name: "Yakkasaroy",
    },
    {
      id: 5,
      name: "Yunusobod",
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
  //     const res = await baseURL.get("/api/admin/locker/");
  //     console.log(res.data.data, "res");
  //     setDataCourse(res.data.data);
  //   } catch (error) {
  //     console.log(error, "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  return (
    <>
      {loading ? (
        <div className="text-center mt-12">
          <Spin size="large" />
        </div>
      ) : dataCourse.length > 0 ? (
        <Row gutter={[20, 20]} className="mt-10 mb-40 md:mb-0">
          {dataCourse.map((item) => (
            <Col
              xl={6}
              span={24}
              key={item.id}
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
