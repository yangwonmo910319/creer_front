import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { SignUp } from "./pages/member/SignUp";
import { Login } from "./pages/member/Login";
import { Cart } from "./pages/goods/Cart";
import { MyPage } from "./pages/member/MyPage";
import { GoodsList } from "./pages/goods/GoodsList";
import { GoodsDetail } from "./pages/goods/GoodsDetail";
import { AuctionList } from "./pages/aution/AuctionList";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route element={<Main />}>
            {/* <Route path="/" element={<Home />}></Route>      */}
            <Route path="/" element={<GoodsList />}></Route>
            <Route path="/Goods/:num" element={<GoodsDetail />}></Route>
            <Route path="/AuctionList" element={<AuctionList />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/MyPage" element={<MyPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
