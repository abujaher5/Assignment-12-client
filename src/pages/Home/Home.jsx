import Testimonial from "../../components/Testimonial";
import OurService from "../OurService/OurService";
import Banner from "./Banner/Banner";
import Technology from "./Technology/Technology";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OurService></OurService>
      <Technology></Technology>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
