import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateTechnologiesInfo = () => {
  const { name, technologyDetails, image, _id } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  console.log(name, _id);
  const onSubmit = async (data) => {
    console.log(data);
    console.log("Button Clicked");

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res);

    if (res.data.success) {
      const updatedItem = {
        name: data.name,
        technologyDetails: data.details,
        image: res.data.data.display_url,
      };

      const updatedRes = await axiosSecure.patch(
        `/technologies/${_id}`,
        updatedItem
      );
      console.log(updatedRes.data);
      if (updatedRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} information updated Successfully.`,
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
        Update Technology
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
              defaultValue={name}
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
              defaultValue={technologyDetails}
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
            Update Technology
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTechnologiesInfo;
