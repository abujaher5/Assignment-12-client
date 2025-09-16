import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTechnology = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // image upload to imgbb and then get an url

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      //now send the technologyItem data to the server with the image url
      const technologyItem = {
        name: data.name,
        technologyDetails: data.details,
        image: res.data.data.display_url,
      };
      const technologyRes = await axiosSecure.post(
        "/technologies",
        technologyItem
      );
      console.log(technologyRes.data);

      if (technologyRes.data.insertedId) {
        // show success popup

        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the technology.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manageTechnologies");
      }
    }
  };
  return (
    <div>
      <h2 className="text-blue-600 text-center text-3xl font-bold uppercase">
        Add a technology
      </h2>

      <div className="  mt-6 bg-cyan-700 p-10 rounded-xl shadow-lg text-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white ">Technology Name</span>
            </label>
            <input
              type="text"
              placeholder="Technology Name"
              {...register("name", { required: true })}
              className="input input-bordered
              text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              
      
              w-full "
            />
          </div>

          <div className="form-control">
            <div className="label">
              <span className="label-text text-white">Technology Details</span>
            </div>
            <textarea
              {...register("details")}
              className="textarea textarea-bordered h-16 lg:h-24
              text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              "
              placeholder="Technology Details"
            ></textarea>
          </div>
          <div className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text text-white">Technology Image</span>
            </div>

            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input text-black file-input-bordered w-full max-w-xs"
            />
          </div>

          <button className="btn my-6 bg-blue-500  w-full uppercase">
            Add Technology
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTechnology;
