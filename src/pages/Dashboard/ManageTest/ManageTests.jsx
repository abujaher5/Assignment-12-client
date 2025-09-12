import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageTests = () => {
  const { data: tests = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  const axiosSecure = useAxiosSecure();
  const handleDelete = (test) => {
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
        const res = await axiosSecure.delete(`/tests/${test._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${test.name} has been deleted.`,
            icon: "success",
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="text-4xl font-bold text-center uppercase max-w-6xl ">
      <h2>Manage tests</h2>

      <div className=" overflow-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>Test Image</th>
              <th>Test Name</th>
              <th>Test Price</th>
              <th>Update Test Info</th>
              <th>Delete Test</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {/* table row  */}
            {tests.map((test, idx) => (
              <tr key={test._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={test.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{test.name}</td>
                <td>${test.price}</td>

                <td>
                  <Link to={`/dashboard/updateTestInfo/${test._id}`}>
                    <button className="btn btn-ghost hover:bg-green-300">
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
                    onClick={() => handleDelete(test)}
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

export default ManageTests;
