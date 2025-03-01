import { Button, Col, Empty, Row } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import baseURL from "../../../utils/api";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Loader } from "../../../components";

export const DepartmentsCardsProduct = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchProducts(Number(id));
    }
  }, [id]);

  const fetchProducts = async (id: number) => {
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      navigate("/");
      return;
    }
    try {
      const res = await baseURL.get(`/api/admin/locker/cell/report/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.data);

      setProduct(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {console.log(product, "salom")}
      <div className="mt-5">
        <Button
          onClick={() => navigate("/departments")}
          className="rounded-xl text-[#54571]"
        >
          <IoMdArrowRoundBack />
          Orqaga
        </Button>
      </div>

      <div className="mt-10 p-3">
        {loading === true ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <Row gutter={[20, 10]}>
              {Array.isArray(product) && product.length > 0 ? (
                <>
                  {product.map((item, index) => (
                    <Col span={24} md={8} key={index}>
                      <div className="bg-white rounded-xl border-2">
                        <div className="rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)] relative">
                          <div className="flex gap-2 w-full">
                            <div className="w-[35%] border-e text-base bg-slate-400 rounded-s-lg p-3 text-white space-y-2">
                              <div className="border-b"># {index + 1}</div>
                              <div className="border-b">ID:</div>
                              <div className="border-b">Ism:</div>
                              <div className="border-b">Manzil:</div>
                              <div className="border-b">Telefon raqam:</div>
                              <div className="border-b">Og'irligi:</div>
                              <div className="border-b">Sanog'i:</div>
                              <div>Narxi:</div>
                            </div>

                            <div className="w-[65%] text-base py-3 px-2 space-y-2">
                              <div className="border-b">{"\u200B"}</div>
                              <div className="border-b">
                                {item.user_id || "—"}
                              </div>
                              <div className="border-b">
                                {item.full_name || "—"}
                              </div>
                              <div className="border-b">
                                {item.address || "—"}
                              </div>
                              <div className="border-b">
                                {item.phone || "—"}
                              </div>
                              <div className="border-b">
                                {item.weight || "—"}
                                <span className="text-gray-500 font-semibold">
                                  {" "}
                                  kg
                                </span>
                              </div>
                              <div className="border-b ">
                                {item.count || "—"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </>
              ) : (
                <div className="w-full flex justify-center">
                  <>
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      className="text-xl"
                      description="Tovar yo'q"
                    />
                  </>
                </div>
              )}
            </Row>
          </>
        )}
      </div>
    </>
  );
};
