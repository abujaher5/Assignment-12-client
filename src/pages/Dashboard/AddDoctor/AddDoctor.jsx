import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddDoctor = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
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
      //now send the doctorInfo data to the server with the image url
      const doctorInfo = {
        name: data.name,
        specialize: data.specialize,
        location: data.location,
        availableOn: data.availableOn,
        availableTime: data.availableTime,
        image: res.data.data.display_url,
      };
      const doctorRes = await axiosSecure.post("/doctors", doctorInfo);
      console.log(doctorRes.data);

      if (doctorRes.data.insertedId) {
        // show success popup

        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the doctor.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/manageDoctors");
      }
    }
  };
  //   console.log("with image url", res.data);
  return (
    <div>
      <h2 className="text-blue-600 text-center text-3xl font-bold  uppercase">
        Add A Doctor
      </h2>

      <div className="mt-6 bg-cyan-700 p-10 rounded-xl shadow-lg text-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white ">Doctor Name*</span>
              </label>
              <input
                type="text"
                placeholder="Doctor Name"
                {...register("name", { required: true })}
                className="input input-bordered
              text-black
              placeholder-white
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              
      
              w-full "
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white ">Specialist</span>
              </label>
              <input
                type="text"
                placeholder="Doctor Specialize In "
                {...register("specialize", { required: true })}
                className="input input-bordered
              text-black
              placeholder-white
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              
      
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
                required
                placeholder="Location"
                {...register("location", { required: true })}
                className="input input-bordered
         text-black
         placeholder-black
              focus:bg-white w-full "
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-white">Available On</span>
              </label>
              <input
                type="text"
                required
                placeholder="Sat, Sun, Mon ...etc. "
                {...register("availableOn", { required: true })}
                className="input input-bordered
                text-black
              placeholder-white
              md:placeholder-black lg:placeholder-black
              focus:bg-white w-full "
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
                {...register("availableTime")}
                className="
              input input-bordered
              text-black
              placeholder-white
              md:placeholder-black lg:placeholder-black
              focus:bg-white
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
                className="file-input text-black file-input-bordered w-full"
              />
            </div>
          </div>

          <button className="btn my-10 bg-blue-500  w-full">Add Doctor</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
