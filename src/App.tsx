import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Arxive,
  Categories,
  Discounted,
  Filials,
  Filters,
  Home,
  LoginPage,
  Postomat,
} from "./pages";
import { ErrorBoundarayContainer, Layout } from "./components";
import { Provider } from "mobx-react";
import { useEffect, useState } from "react";
import { NotFound } from "./components/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import searchStore from "./store/searchStore";
import { PostomatDepartments } from "./pages/postomat/postomatDepartments/postomatDepartments";

const App = () => {
  const [totalPaymentFee, setTotalPaymentFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [residual, setResidual] = useState(0);

  useEffect(() => {
    setResidual(totalPaymentFee - totalPrice);
  }, [totalPaymentFee, totalPrice]);

  return (
    <ErrorBoundarayContainer>
      <Provider searchStore={searchStore}>
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route index path="/" element={<LoginPage />} />
            <Route
              element={
                <Layout
                  totalPaymentFee={totalPaymentFee}
                  totalPrice={totalPrice}
                  residual={residual}
                />
              }
            >
              <Route
                path="/dashboard"
                element={
                  <Home
                    setTotalPaymentFee={setTotalPaymentFee}
                    setTotalPrice={setTotalPrice}
                    residual={residual}
                  />
                }
              />
              <Route path="/filials" element={<Filials />} />
              <Route path="/arxiv" element={<Arxive />} />
              <Route path="/filters" element={<Filters />} />
              <Route path="/discounted" element={<Discounted />} />
              <Route path="/postomat" element={<Postomat />} />{" "}
              <Route path="/departments" element={<PostomatDepartments />} />
              <Route path="/categories" element={<Categories />} />
            </Route>
          </Routes>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </ErrorBoundarayContainer>
  );
};

export default App;
