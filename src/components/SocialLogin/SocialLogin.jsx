import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleLogIn } = useAuth();

  const handleGoogleLogIn = () => {
    googleLogIn().then((result) => console.log(result));
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
