import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Contact, Home, LoginPage } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/customers" element={<About />} />
          <Route path="/reports" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
