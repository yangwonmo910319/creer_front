import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { SignUp } from "./pages/member/SignUp";
import { Login } from "./pages/member/Login";
import { Cart } from "./pages/goods/Cart";
import { Seller } from "./pages/member/Seller";
import { MyPage } from "./pages/member/MyPage";
import { GoodsList } from "./pages/goods/GoodsList";
import { GoodsDetail } from "./pages/goods/GoodsDetail";
import { GoodsWrite } from "./pages/goods/GoodsWrite";
import { GoodsEdit } from "./pages/goods/GoodsEdit";
import { ChatList } from "./pages/chat/ChatList";
import { Chatting } from "./pages/chat/Chatting";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route element={<Main />}>
            <Route path="/" element={<GoodsList />}></Route>
            <Route path="/:title" element={<GoodsList />}></Route>
            <Route path="/Goods/:goodsId" element={<GoodsDetail />}></Route>
            <Route path="/GoodsEdit/:goodsId" element={<GoodsEdit />}></Route>
            <Route path="/GoodsWrite" element={<GoodsWrite />}></Route>
            <Route path="/Cart" element={<Cart />}></Route>
            <Route path="/Seller" element={<Seller />}></Route>
            <Route path="/MyPage" element={<MyPage />}></Route>
            <Route path="/ChatList" element={<ChatList />} />
            <Route path="/Chatting/:roomId" element={<Chatting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
