import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
const Dashboard = lazy(()=>import("./Pages/Dashboard"));
import SendMoney from "./Pages/SendMoney";
import Notfound from "./Pages/Notfound";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import Headerskelaton from "./Components/Skelaton/Headerskelaton";
import Balanceskelaton from "./Components/Skelaton/Balanceskelaton";
import Userskelaton from "./Components/Skelaton/Userskelaton";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<>
                <Headerskelaton />
                <Balanceskelaton />
                <Userskelaton />
              </>} >
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="/sendmoney" element={<SendMoney />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
