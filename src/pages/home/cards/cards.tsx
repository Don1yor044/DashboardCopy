import { Button, Modal, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { LuCheck } from "react-icons/lu";
import axios from "axios";
import { CardsLi } from "./cardsLi/cardsLi";

export const Cards = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCourse, setDataCourse] = useState([]);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token is missing");
        return;
      }
      setLoading(true);
      const response = await axios.get(
        `https://api.abusahiy.uz/api/client/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log(response.data.data.dashboards, "checkDAta");
      setDataCourse(response.data.data.dashboards);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center mt-10">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {" "}
          <div className="mt-10 2xl:w-[90%] w-[95%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dataCourse?.map((items: any) => (
              <div className="bg-white rounded-xl border border-transparent hover:border-[#FE5222]">
                <div className="p-4 py-2 rounded-lg shadow-[0px_0px_30px_-10px_rgba(34,60,80,0.38)]">
                  <ul className="list-none space-y-2">
                    <CardsLi items={items} />
                  </ul>
                  <div className="my-3 flex justify-end pr-3">
                    <Button
                      type="text"
                      className="h-8 w-8 p-0 flex justify-center bg-[#FFE0D7] text-black"
                    >
                      <LuCheck color="#FE5222" size={19} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <TextArea
          className="!min-h-52 !max-h-52 mt-5 bg-gray-100"
          placeholder="Comment..."
        />
        <Button
          type="text"
          onClick={handleOk}
          className="w-full block mt-3 rounded-full bg-[#FE5222] text-white h-10"
        >
          OK
        </Button>
      </Modal>
    </>
  );
};
{
  /* {items.name === "Comment" && (
                        <span
                          className="ml-auto cursor-pointer"
                          onClick={showModal}
                        >
                          <div className="bg-[#FE5222] text-white rounded-full p-[6px]">
                            <FiPlus size={15} />
                          </div>
                        </span>
                      )} */
}
