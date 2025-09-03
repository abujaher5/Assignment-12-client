import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateDoctorsInfo = () => {
  const { name, specialize, location, availableOn, availableTime, image, _id } =
    useLoaderData();
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
        specialize: data.specialize,
        location: data.location,
        availableOn: data.availableOn,
        availableTime: data.availableTime,
        image: res.data.data.display_url,
      };

      const updatedRes = await axiosSecure.patch(
        `/doctors/${_id}`,
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
        navigate("/dashboard/manageDoctors");
      }
    }
  };
  return (
    <div>
      <div className="mt-6 bg-cyan-700 p-10 rounded-xl shadow-lg text-white  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex gap-6 ">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white ">Doctor Name*</span>
              </label>
              <input
                type="text"
                defaultValue={name}
                placeholder="Doctor Name"
                {...register("name", { required: true })}
                className="input 
                input-bordered
              text-black
              placeholder-black
              md:placeholder-black lg:placeholder-black
              focus:bg-white placeholder-opacity-40
              
      
              w-full "
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white ">Specialist</span>
              </label>
              <input
                type="text"
                defaultValue={specialize}
                placeholder="Doctor Specialize In "
                {...register("specialize", { required: true })}
                className="input input-bordered
              text-black
              placeholder-black
              md:placeholder-black lg:placeholder-black
              focus:bg-white placeholder-opacity-40
              
      
              w-full "
              />
            </div>
          </div>

          <div className="lg:flex gap-6">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-white">Location</span>
              </label>
              <input
                type="text"
                defaultValue={location}
                required
                placeholder="Location"
                {...register("location", { required: true })}
                className="input input-bordered
         text-black
         placeholder-black
              focus:bg-white placeholder-opacity-40 w-full "
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-white">Available On</span>
              </label>
              <input
                type="text"
                defaultValue={availableOn}
                required
                placeholder="Sat, Sun, Mon ...etc. "
                {...register("availableOn", { required: true })}
                className="input input-bordered
             
                text-black
              placeholder-black
              md:placeholder-black lg:placeholder-black
              focus:bg-white placeholder-opacity-40 w-full "
              />
            </div>
          </div>

          <div className="lg:flex  gap-6">
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text text-white">Available Time</span>
              </div>
              <input
                required
                type="text"
                defaultValue={availableTime}
                {...register("availableTime")}
                className="
              input input-bordered
              text-black
              placeholder-black
              md:placeholder-black lg:placeholder-black
              focus:bg-white placeholder-opacity-40
              "
                placeholder=" 10.00 am to 2.00 pm"
              />
            </div>
            <div className="form-control w-full">
              <div className="label">
                <span className="label-text text-white">Doctor's Photo</span>
              </div>

              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input text-black 
                text-opacity-40
                file-input-bordered w-full"
              />
            </div>
          </div>

          <button className="btn my-10 bg-blue-500  w-full">
            Update Doctors Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctorsInfo;
