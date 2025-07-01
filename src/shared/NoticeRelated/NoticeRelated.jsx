import { FaPhone } from "react-icons/fa";
import logo from "../../assets/FamousDiagnosticLogo.png";
import { CgMail } from "react-icons/cg";

const NoticeRelated = () => {
  return (
    <div
      className="
    
    flex justify-around flex-col lg:flex-row 
    "
    >
      <div className="flex justify-around flex-1">
        <div className=" rounded-full lg:mt-4 mt-1  ">
          <img src={logo} className="h-20 w-20 rounded-full" alt="" />
        </div>

        <div className="flex flex-col space-y-2">
          <h2 className="text-xl font-semibold text-red-600">Hotline</h2>
          <h2 className="inline-flex font-semibold items-center gap-3">
            <FaPhone className="text-green-600"></FaPhone> 10101
          </h2>
          <p className="text-sm">All Branches</p>
        </div>
      </div>

      <div className="flex justify-around flex-1 ">
        <div className="text-center space-y-2 ">
          <h2 className="text-xl text-center font-semibold text-red-600">
            Working Hour
          </h2>
          <p className="font-semibold">
            We are
            <br /> open 24/7
          </p>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold text-red-600 text-center">
            Email Us
          </h2>
          <h3 className="lg:flex hidden items-center justify-center gap-2 ">
            <CgMail />
            famousdiagnosticcenter@gmail.com
          </h3>
          <h3 className="flex lg:hidden items-center justify-center ml-4 mt-2  w-1/2">
            <CgMail size={30} />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NoticeRelated;
