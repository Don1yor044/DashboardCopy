import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Customers, Filials, Home, LoginPage, Reports } from "./pages";
import { Layout } from "./components";
import { useState } from "react";

const App = () => {
  const [totalPaymentFee, setTotalPaymentFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route
          element={
            <Layout totalPaymentFee={totalPaymentFee} totalPrice={totalPrice} />
          }
        >
          <Route
            path="/dashboard"
            element={
              <Home
                setTotalPaymentFee={setTotalPaymentFee}
                setTotalPrice={setTotalPrice}
              />
            }
          />
          <Route path="/filials" element={<Filials />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
