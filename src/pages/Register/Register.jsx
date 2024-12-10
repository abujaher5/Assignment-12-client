import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

import districtData from "../../../public/district.json";
import upazilaData from "../../../public/upazilas.json";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const district = districtData;

  const upazilas = upazilaData;

  const { createUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // // img bb to  send avatar to data base
    // const imageFile = { image: data.image[0] };
    // const res = await axiosPublic.post(image_hosting_api, imageFile, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // if (res.data.success) {
    //   const image = res.data.data.display_url;
    // }
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        const userInfo = {
          name: data.name,
          email: data.email,
          status: "Active",
          role: "Admin",
          // avatar: res.data.data.display_url,
        };
        console.log(userInfo);
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log("user added to the database");
            // reset();
            Swal.fire({
              position: "top-left",
              icon: "success",
              title: "User Profile Update Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      })

      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Helmet>
        <title>Famous Diagnostic | Register</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
          <h1 className=" text-5xl font-bold">Please Register</h1>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Blood Group</label>
                <select
                  {...register("bloodGroup", { required: true })}
                  name="bloodGroup"
                  className="select select-bordered"
                >
                  <option disabled selected>
                    Select Your Blood
                  </option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">District</label>
                <select
                  {...register("district", { required: true })}
                  name="district"
                  className="select select-bordered"
                >
                  <option disabled selected>
                    Select Your District
                  </option>

                  {district.map((dis) => (
                    <option key={dis.id}>{dis.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">Upazila</label>
                <select
                  {...register("upazila", { required: true })}
                  name="upazila"
                  className="select select-bordered"
                >
                  <option disabled selected>
                    Select Your Upazila
                  </option>
                  {upazilas.map((upazila) => (
                    <option>{upazila.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">Avater</label>
                <input
                  {...register("avatar", { required: true })}
                  name="avatar"
                  type="file"
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Confirm Password</span>
                </label>
                <input
                  {...register("confirmPassword", { required: true })}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <div className="text-center mt-2">
                <div>
                  <p className="text-[#D1A054B3]"> Already have an account !</p>
                  <Link to="/login">
                    <p className="font-bold text-[#D1A054B3]">Go to Login</p>
                  </Link>
                  <div className="mt-2">
                    <SocialLogin></SocialLogin>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
