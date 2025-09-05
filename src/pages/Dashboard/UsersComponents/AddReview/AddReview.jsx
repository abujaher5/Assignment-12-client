import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
// const image_hosting_key = import.meta.env.VITE_image_hosting_key;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddReview = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    console.log(data);

    const reviewItem = {
      aboutService: data.aboutService,
      name: user?.displayName,
      location: data.location,
      image: user?.photoURL,
    };
    const reviewRes = await axiosSecure.post("/reviews", reviewItem);
    console.log(reviewRes.data);

    if (reviewRes.data.insertedId) {
      // show success popup

      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Review added successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-blue-600 text-center text-3xl font-bold uppercase">
          Add A review
        </h2>

        <div className="  mt-6 bg-cyan-700 p-10 rounded-xl shadow-lg text-white ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <div className="label">
                <span className="label-text text-white">About Our Service</span>
              </div>
              <textarea
                {...register("aboutService")}
                className="textarea textarea-bordered h-20 lg:h-24
              text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              "
                placeholder="about service"
              ></textarea>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white ">I Am From</span>
              </label>
              <input
                type="text"
                placeholder="location"
                {...register("location", { required: true })}
                className="input input-bordered
              text-black
              placeholder-black placeholder-opacity-30
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              
      
              w-full "
              />
            </div>

            <button className="btn my-6 bg-blue-500  w-full uppercase">
              Add A Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
