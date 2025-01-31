import { Col, Empty, Row, Spin } from "antd";
import baseURL from "../../../utils/api";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { FilialsCardsItems } from "../filialsCardsItems/filialsCardsItems";

export interface IfilialsCardsData {
  id: number;
  name: string;
  payment_fee: number;
  weight_delivered_by_seller: number;
  paid_payment_fee: number;
  paid_by_card: number;
  paid_by_payme: number;
  left_weight: number;
  paid_by_cash: number;
  count_delivered_by_seller: number;
  delivered_item_counts: number;
  received_item_counts: number;
  discounted_fee: number;
  delivered_weight: number;
  received_weight: number;
}

export const FilialsCards = observer(
  ({ dateFrom, dateTo }: { dateFrom: string; dateTo: string }) => {
    const navigate = useNavigate();
    const [dataCourse, setDataCourse] = useState<IfilialsCardsData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        navigate("/");
        return;
      }
      try {
        const response = await baseURL.get(
          `/api/admin/pda/branch/show/?from=${dateFrom}&to=${dateTo}`,
          {
            params: {
              from: dateFrom,
              to: dateTo,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data.data, "FilialDAta");

        if (Array.isArray(response.data.data)) {
          setDataCourse(response.data.data);
        } else if (response.data.data) {
          setDataCourse([response.data.data]);
        } else {
          setDataCourse([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, [dateFrom, dateTo]);

    if (isLoading) {
      return (
        <div className="flex justify-center mt-20 md:mt-10">
          <Spin size="large" />
        </div>
      );
    }

    if (!dataCourse || dataCourse.length === 0) {
      return (
        <div className="flex justify-center p-8">
          <div className="mt-10 w-full ">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="text-xl" />
          </div>
        </div>
      );
    }

    return (
      <div className="px-2">
        <Row gutter={[20, 20]} className="mt-16 md:mt-10 md:mb-0 mb-56">
          {dataCourse.map((item, index) => (
            <Col
              xl={9}
              span={24}
              key={index}
              // onClick={() => navigate("/discounted")}
              // className="cursor-pointer"
            >
              <FilialsCardsItems item={item} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
);
