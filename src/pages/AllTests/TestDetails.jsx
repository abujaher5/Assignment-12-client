import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TestDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { name, price, testDetails, image, _id } = useLoaderData();
  const navigate = useNavigate();

  console.log(name, price, testDetails, _id);
  const { user } = useAuth();
  const handleAddToListing = () => {
    console.log("Add this to my listing.");

    if (user && user?.email) {
      const listingItem = {
        listingId: _id,
        email: user?.email,
        name,
        image,
        price,
        testDetails,
      };
      axiosSecure.post("/myListings", listingItem).then((res) => {
        console.log(res.data);

        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name}`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myListings");
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to cart",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Please Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", {
            state: {
              from: location,
            },
          });
        }
      });
    }
  };

  return (
    <div className="lg:p-10 p-4">
      <div className="card card-side bg-base-100 shadow-lg flex flex-col rounded-sm gap-10">
        <figure className="p-2">
          <img src={image} alt="Test Image" />
        </figure>
        <div className="card-body justify-center text-start space-y-4 bg-gray-200 rounded-sm ">
          <h2 className=" font-semibold">
            <span className=" text-black px-2 py-1 rounded-md font-semibold uppercase">
              Test Name :
            </span>
            {name}
          </h2>
          <p className="flex-grow-0">
            <span className=" text-black px-2 py-1 rounded-md font-semibold uppercase lg:mr-2 md:mr-2 mr-1">
              About Test :
            </span>
            {testDetails}
          </p>
          <p className="flex-grow-0">
            <span className=" text-black px-2 py-1 rounded-md font-semibold uppercase lg:mr-2 md:mr-2 mr-1">
              Test Charge :
            </span>
            $ {price}
          </p>
          <div className="card-actions justify-center">
            <button
              onClick={() => handleAddToListing()}
              className="btn btn-primary"
            >
              Book For Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
