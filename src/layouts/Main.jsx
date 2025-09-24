import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import NoticeRelated from "../shared/NoticeRelated/NoticeRelated";

const Main = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <NoticeRelated></NoticeRelated>
      <Navbar></Navbar>

      <div className="min-h-[calc(100vh-306px)] mx-auto bg-white dark:bg-[#1c2229]">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Main;
