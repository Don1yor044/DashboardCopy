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
  paid_payment_fee: number;
  paid_by_card: number;
  paid_by_payme: number;
  paid_by_cash: number;
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
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is missing or invalid");
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
        setError("Error fetching data");
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
        <div className="flex justify-center p-8">
          <Spin size="large" />
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 p-4">{error}</div>;
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
      <Row gutter={[20, 20]} className="mt-10">
        {dataCourse.map((item, index) => (
          <Col
            xl={8}
            span={12}
            key={index}
            onClick={() => navigate("/discounted")}
            className="cursor-pointer"
          >
            <FilialsCardsItems item={item} />
          </Col>
        ))}
      </Row>
    );
  }
);
