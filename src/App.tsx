import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Customers, Filials, Home, LoginPage, Reports } from "./pages";
import { Layout } from "./components";
import { Arxive } from "./pages/arxive";
import { Provider } from "mobx-react";
import searchStore from "../src/store/store";
import { useState } from "react";
const App = () => {
  const [totalPaymentFee, setTotalPaymentFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <Provider searchStore={searchStore}>
      <Router>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route
            element={
              <Layout
                totalPaymentFee={totalPaymentFee}
                totalPrice={totalPrice}
              />
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
            <Route path="/arxive" element={<Arxive />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
