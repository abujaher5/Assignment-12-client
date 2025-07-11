import { FaAmbulance } from "react-icons/fa";

const OurService = () => {
  return (
    <div className="flex gap-5 mt-20">
      <div className="flex-1">
        <h2 className="text-4xl font-bold my-4 ">Our Services</h2>
        <p className="text-white text-lg font-semibold">
          We provide accurate and affordable diagnostic tests with fast
          reporting and expert analysis. Our center offers a wide range of
          services including pathology, radiology, and health check-up packages.
          With advanced equipment and skilled professionals, we ensure reliable
          results and compassionate care.
        </p>

        <h2 className="text-2xl font-semibold text-white my-3">We Provide</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 ">
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg p-4">
            Pathology
          </div>
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg p-4">
            Radiology
          </div>
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg p-4">
            Imaginary
          </div>
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg p-4">
            Health check-up packages
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div>
          <h2 className="text-4xl font-bold my-3"> Latest Announcement</h2>
          <h2 className="text-white font-semibold text-lg my-3">
            We Provide Spacial Discount For Any Pandemic Situation.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-blue-500 w-1/2 p-8 rounded-md ml-5">
            <h2 className="text-2xl font-semibold text-white flex animate-flash-red gap-3">
              <FaAmbulance
                className="text-red-600 text-6xl  animate-wiggle-x "
                size={55}
                color="white"
              ></FaAmbulance>
              Call For Ambulance
            </h2>
          </div>
          <div className="bg-blue-500 ml-10 w-1/2 p-8 rounded-md text-2xl font-semibold text-white  text-center animate-flash-green">
            Sample Collection From Home
          </div>
          <div className="bg-blue-500 ml-[60px] w-1/2 p-8 rounded-md text-2xl font-semibold text-white  text-center animate-flash-gray">
            Urgent Report Home Delivery
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurService;
