import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const ManageTechnologies = () => {
  const { data: technologies = [], refetch } = useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/technologies");
      return res.data;
    },
  });

  const axiosSecure = useAxiosSecure();
  const handleDelete = (technology) => {
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
        const res = await axiosSecure.delete(`/technologies/${technology._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: `${technology.name} has been deleted.`,
            icon: "success",
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div className="text-4xl font-bold text-center uppercase max-w-6xl ">
      <h2>Manage Technologies</h2>

      <div className=" overflow-auto">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>Technology Image</th>
              <th>Technology Name</th>
              <th>Update Technology Info</th>
              <th>Delete Technology</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {/* table row  */}
            {technologies.map((technology, idx) => (
              <tr key={technology._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="rounded-md  h-16 w-16">
                        <img src={technology.image} alt="Technology Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{technology.name}</td>
                <td>
                  <Link
                    to={`/dashboard/updateTechnologiesInfo/${technology._id}`}
                  >
                    <button className="btn btn-ghost hover:bg-green-300">
                      <FaEdit size={30} color="green" />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(technology)}
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

export default ManageTechnologies;
