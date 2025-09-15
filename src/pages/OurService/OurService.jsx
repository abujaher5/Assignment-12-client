import { FaAmbulance } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OurService = () => {
  const navigate = useNavigate();
  const handleClick = (category) => {
    navigate(`/allTest?category=${category}`);
  };
  return (
    <div className="flex flex-col p-2  lg:flex lg:flex-row gap-5 mt-20 bg-[linear-gradient(0deg,#151515B3,#151515B3),url('https://i.ibb.co.com/fdTXj4C7/doctors-office-flatlay.jpg')] bg-cover bg-no-repeat bg-fixed text-white  ">
      <div className="flex-1 text-center lg:text-start lg:ml-4    ">
        <h2 className="text-4xl font-bold my-4 ">Our Services</h2>
        <p className="text-white text-lg font-semibold">
          We provide accurate and affordable diagnostic tests with fast
          reporting and expert analysis. Our center offers a wide range of
          services including pathology, radiology, and health check-up packages.
          With advanced equipment and skilled professionals, we ensure reliable
          results and compassionate care.
        </p>

        <h2 className="text-2xl font-semibold text-white my-6">We Provide</h2>
        <div className="flex flex-col items-center lg:grid lg:grid-cols-2 gap-3">
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg p-4">
            <button onClick={() => handleClick("pathology")}>Pathology</button>
          </div>
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg p-4">
            <button>Radiology</button>
          </div>
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg p-4">
            Imaginary
          </div>
          <div className="w-2/3 rounded-md bg-blue-500 text-white font-semibold text-lg px-4 py-2">
            Health check-up packages
          </div>
        </div>
      </div>

      <div className="flex-1 text-center lg:text-start ">
        <div>
          <h2 className="text-4xl font-bold my-3"> Latest Announcement</h2>
          <h2 className="text-white font-semibold text-lg my-3">
            We Provide Spacial Discount For Any Pandemic Situation.
          </h2>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="bg-blue-500 w-1/2 px-8 py-4 rounded-md ml-5">
            <h2 className="text-2xl font-semibold text-white flex animate-flash-red gap-3 flex-col  items-center">
              <FaAmbulance
                className="text-red-600 text-6xl  animate-wiggle-x "
                size={55}
                color="white"
              ></FaAmbulance>
              <div> Call For Ambulance</div>
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
