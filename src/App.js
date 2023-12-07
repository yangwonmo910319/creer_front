import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main"
import { SignUp } from "./pages/member/SignUp";
import { Login } from "./pages/member/Login";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
         <BrowserRouter>
            <Routes>
              <Route path="/Login" element={<Login/>} >    </Route>   
              <Route element={<Main/>}>
                <Route path="/" element={<Home/>} ></Route>  
                <Route path="/Signup" element={<SignUp/>} ></Route>  
              </Route>
            </Routes>
          </BrowserRouter>
     
    </>
  );
}

export default App;
