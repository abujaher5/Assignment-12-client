import Testimonial from "../../components/Testimonial";
import AllTests from "../AllTests/AllTests";
import OurService from "../OurService/OurService";
import Banner from "./Banner/Banner";
import ContactUs from "./Contact/ContactUs";
import OurDoctor from "./OurDoctor/OurDoctor";
import Technology from "./Technology/Technology";

const Home = () => {
  return (
    <div>
      <Banner />
      <OurService />
      <OurDoctor />
      <Technology />
      <Testimonial />
      <ContactUs />
    </div>
  );
};

export default Home;
