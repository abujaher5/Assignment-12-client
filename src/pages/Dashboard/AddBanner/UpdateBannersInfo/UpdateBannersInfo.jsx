import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateBannersInfo = () => {
  const { bHeading, bDetails, buttonName, image, _id } = useLoaderData();
  console.log(_id);

  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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
        bHeading: data.bHeading,
        bDetails: data.bDetails,
        buttonName: data.buttonName,
        image: res.data.data.display_url,
      };

      const updatedRes = await axiosSecure.patch(
        `/banners/${_id}`,
        updatedItem
      );

      console.log(updatedRes.data);

      if (updatedRes.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.bHeading} information updated Successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manageBanners");
      }
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-blue-600 text-center text-3xl font-bold uppercase">
          Update This Banner
        </h2>

        <div className="  mt-6 bg-cyan-700 p-10 rounded-xl shadow-lg text-white ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white ">Banner Heading</span>
              </label>
              <input
                type="text"
                placeholder="Banner Heading"
                defaultValue={bHeading}
                {...register("bHeading", { required: true })}
                className="input input-bordered
              text-black
              placeholder-black placeholder-opacity-90
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              
      
              w-full "
              />
            </div>

            <div className="form-control">
              <div className="label">
                <span className="label-text text-white">Banner Details</span>
              </div>
              <textarea
                {...register("bDetails")}
                defaultValue={bDetails}
                className="textarea textarea-bordered h-20 lg:h-24
              text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              "
                placeholder="Banner Details"
              ></textarea>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white ">Button Name</span>
              </label>
              <input
                type="text"
                placeholder="Button Name"
                defaultValue={buttonName}
                {...register("buttonName", { required: true })}
                className="input input-bordered
              text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              w-full "
              />
            </div>
            <div className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text text-white">Banner Image*</span>
              </div>

              <input
                {...register("image")}
                type="file"
                className="file-input text-black file-input-bordered w-full max-w-xs"
              />
            </div>

            <button className="btn my-6 bg-blue-500  w-full hover:text-yellow-400 uppercase">
              Update This Banner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBannersInfo;
