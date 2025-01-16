import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Customers, Filials, Home, LoginPage, Reports } from "./pages";
import { Layout } from "./components";
import { Arxive } from "./pages/arxive";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/filials" element={<Filials />} />
          <Route path="/arxive" element={<Arxive />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
