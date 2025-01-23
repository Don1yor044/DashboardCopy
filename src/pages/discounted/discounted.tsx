import { useEffect } from "react";
import baseURL from "../../utils/api";

export const Discounted = () => {
  useEffect(() => {
    discount();
  }, []);
  const discount = async () => {
    try {
      const res = await baseURL.get(
        `/api/client/dashboard/discounted/orders/`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>Discounted</div>;
};
