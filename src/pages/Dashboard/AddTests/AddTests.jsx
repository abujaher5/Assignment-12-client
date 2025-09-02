import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_image_hosting_key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTests = () => {
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
      //now send the testItem data to the server with the image url
      const testItem = {
        name: data.name,
        date: data.date,
        price: parseFloat(data.price),
        testDetails: data.details,
        image: res.data.data.display_url,
      };
      const testRes = await axiosSecure.post("/tests", testItem);
      console.log(testRes.data);

      if (testRes.data.insertedId) {
        // show success popup

        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the test.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/allTests");
      }
    }
  };
  //   console.log("with image url", res.data);
  return (
    <div>
      <h2 className="text-blue-600 text-center text-3xl font-bold uppercase">
        Add a Test
      </h2>

      <div className="  mt-6 bg-cyan-700 p-10 rounded-xl shadow-lg text-white ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-white ">Test Name*</span>
            </label>
            <input
              type="text"
              placeholder="Test Name"
              {...register("name", { required: true })}
              className="input input-bordered
              text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              
      
              w-full "
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-white">Date*</span>
              </label>
              <input
                type="date"
                required
                placeholder="Date"
                {...register("date", { required: true })}
                className="input input-bordered
         text-black
         placeholder-opacity-40
         text-opacity-40
            
              focus:bg-white w-full "
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-white">Price*</span>
              </label>
              <input
                type="number"
                required
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered
                text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white w-full "
              />
            </div>
          </div>

          <div className="form-control">
            <div className="label">
              <span className="label-text text-white">Test Details*</span>
            </div>
            <textarea
              {...register("details")}
              className="textarea textarea-bordered h-16 lg:h-24
              text-black
              placeholder-black placeholder-opacity-40
              md:placeholder-black lg:placeholder-black
              focus:bg-white
              "
              placeholder="Test Details"
            ></textarea>
          </div>
          <div className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text text-white">Test Image*</span>
            </div>

            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input text-black file-input-bordered w-full max-w-xs"
            />
          </div>
          {/* <input className="btn btn-outline" type="submit" value={"Add Item"} /> */}

          <button className="btn my-6 bg-blue-500  w-full uppercase">
            Add Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTests;
