import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import NoticeRelated from "../shared/NoticeRelated/NoticeRelated";

const Main = () => {
  return (
    <div>
      <NoticeRelated></NoticeRelated>
      <Navbar></Navbar>

      <div className="min-h-[calc(100vh-306px)] mx-auto">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Main;
