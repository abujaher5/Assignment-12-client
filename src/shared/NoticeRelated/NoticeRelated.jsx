import { FaPhone } from "react-icons/fa";

const NoticeRelated = () => {
  return (
    <div className="flex justify-around gap-10 my-10">
      <div>
        <h2 className="text-4xl text-center p-2 font-bold">
          Famous <br /> Diagnostic
        </h2>
      </div>
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold text-red-600">Hotline</h2>
        <h2 className="inline-flex font-semibold items-center gap-3">
          <FaPhone className="text-green-600"></FaPhone> 10101
        </h2>
        <p className="text-sm">All Branches</p>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-xl text-center font-semibold text-red-600">
          Working Hour
        </h2>
        <p className="font-semibold">
          We are
          <br /> open 24/7
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-red-600">Email Us</h2>
        <h3>info@famousdiagnosticcenter.com</h3>
      </div>
    </div>
  );
};

export default NoticeRelated;
