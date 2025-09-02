import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBanner = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    // image upload to imgbb and then get an url

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      //now send the testItem data to the server with the image url
      const bannerItem = {
        bannerHeading: data.bannerHeading,
        bDetails: data.Details,
        image: res.data.data.display_url,
      };
      const bannerRes = await axiosSecure.post("/banners", bannerItem);
      console.log(bannerRes.data);

      if (bannerRes.data.insertedId) {
        // show success popup

        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.bannerHeading} banner is added.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/manageBanner");
      }
    }
  };
  return (
    <div>
      <div>
        <h2 className="text-blue-600 text-center text-3xl font-bold">
          Add A Banner
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
                {...register("image", { required: true })}
                type="file"
                className="file-input text-black file-input-bordered w-full max-w-xs"
              />
            </div>
            {/* <input className="btn btn-outline" type="submit" value={"Add Item"} /> */}

            <button className="btn my-6 bg-blue-500  w-full uppercase">
              Add A Banner
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
