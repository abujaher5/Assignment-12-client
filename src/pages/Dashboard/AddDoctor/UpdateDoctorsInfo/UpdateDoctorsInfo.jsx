import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const UpdateDoctorsInfo = () => {
  const { name, specialize, location, availableOn, availableTime, image, _id } =
    useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  console.log(name, _id);
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="mt-6 bg-cyan-700 p-10 rounded-xl shadow-lg text-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex gap-6">
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
                // defaultValue={image}
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
