import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageBanners = () => {
  const axiosSecure = useAxiosSecure();
  const { data: banners = [], refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banners");
      return res.data;
    },
  });
  console.log(banners);

  const handleDelete = (banner) => {
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
        const res = await axiosSecure.delete(`/banners/${banner._id}`);
        console.log(res.data);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${banner.bHeading} has been deleted.`,
            icon: "success",
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="text-4xl font-bold text-center  max-w-6xl ">
        <h2 className="uppercase">Manage banners</h2>

        <div className=" overflow-auto">
          <table className="table ">
            {/* head */}
            <thead className="uppercase">
              <tr>
                <th>Banner Image</th>
                <th>Banner Heading</th>
                <th>Banner Details</th>
                <th> Button Name</th>
                <th>Update Info</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {/* table row  */}
              {banners.map((banner, idx) => (
                <tr key={banner._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={banner.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{banner.bHeading}</td>
                  <td>{banner.bDetails}</td>
                  <td>{banner.buttonName} </td>
                  <td>
                    <Link to={`/dashboard/updateBannerInfo/${banner._id}`}>
                      <button className="btn  btn-ghost hover:bg-green-300">
                        <FaEdit
                          size={30}
                          color="green
                                "
                        />
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(banner)}
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
    </div>
  );
};

export default ManageBanners;
