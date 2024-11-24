import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    logIn(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card shrink-0  w-full max-w-sm shadow-2xl bg-base-100">
        <div className="text-center hero-content ">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="from-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="Type Email"
                className="input w-full input-bordered"
                required
              />
            </div>
            <div className="from-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                placeholder="password"
                className="input w-full input-bordered"
                required
              />
            </div>

            <div className="from-control mt-6">
              <input
                type="submit"
                // disabled={disable}
                className="btn  border-none  bg-primary w-full"
                value="Sign In"
              />
              {/* <button
                  disabled={disable}
                  className="btn  border-none  bg-[#D1A054B3]"
                >
                  Sign In
                </button> */}
            </div>

            <div className="text-center space-y-4">
              <div>
                <p className="text-black">New here?</p>
                <Link to="/register">
                  <p className="font-bold text-black">Create a New Account</p>
                </Link>
              </div>
              <div className="mt-2">
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
