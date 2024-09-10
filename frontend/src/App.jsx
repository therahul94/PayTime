import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./Pages/Signup"
import Signin from "./Pages/Signin"
import Dashboard from "./Pages/Dashboard"
import SendMoney from "./Pages/SendMoney"
import Notfound from "./Pages/Notfound"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Footer from "./Components/Footer"

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<>
              <Header />
              <Home />
              <Footer />
            </>} />
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sendmoney" element={<SendMoney />} />
            <Route path="*" element={<Notfound />}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
