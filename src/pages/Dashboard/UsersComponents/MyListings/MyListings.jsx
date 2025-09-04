import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import useListing from "../../../../hooks/useListing";

const MyListings = () => {
  const axiosSecure = useAxiosSecure();
  const [listing, refetch] = useListing();
  console.log(listing);

  const totalPrice = listing.reduce((acc, curValue) => acc + curValue.price, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/myListings/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${listing.name} has been deleted.`,
            icon: "success",
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="md:text-3xl lg:text-4xl text-xl   md:font-semibold lg:font-bold text-center uppercase max-w-6xl p-6 shadow-lg rounded-lg">
      <h2>My Listings</h2>
      <div className="flex items-center justify-between text-sm md:text-xl lg:text-2xl lg:font-semibold text-yellow-400 ">
        <h2>Total Listing: {listing.length}</h2>
        <h2>Total Price: {totalPrice}</h2>
        {/* <Link to={`/dashboard/updateitemInfo/${item._id}`}>
                    <button className="btn btn-ghost bg-blue-400 hover:bg-green-300">
                      Pay
                    </button>
                  </Link> */}
        <button className="btn btn-ghost text-white bg-blue-400 hover:bg-green-300">
          Pay
        </button>
      </div>

      <div className=" overflow-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>Test Image</th>
              <th>Test Name</th>
              <th>Price</th>
              <th>Delete Listing</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {/* table row  */}
            {listing.map((item, idx) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>$ {item.price}</td>

                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost hover:bg-red-300 "
                  >
                    <FaTrash size={30} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyListings;
