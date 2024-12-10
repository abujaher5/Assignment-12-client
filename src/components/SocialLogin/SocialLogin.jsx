import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { googleLogIn } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogIn = () => {
    googleLogIn().then((result) => {
      // console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        status: "Active",
        role: "Admin",
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div>
      <p className="font-semibold">Or sign in with</p>
      <div className="flex items-center justify-center  text-2xl gap-4">
        <FaFacebook></FaFacebook>
        <FaGoogle onClick={handleGoogleLogIn}></FaGoogle>
        <FaGithub></FaGithub>
      </div>
    </div>
  );
};

export default SocialLogin;
