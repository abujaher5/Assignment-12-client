const AllUsers = () => {
  return (
    <div>
      <div className="flex users-center justify-start ml-5 mt-10">
        <h2 className="text-xl font-semibold">Total users: {users.length}</h2>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-t-xl mt-4">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] ">
            <tr>
              <th>#</th>

              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}

            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-lg bg-orange-500"
                    >
                      <FaUsers className="text-white text-2xl"></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-red-600"
                  >
                    <AiFillDelete className="text-white text-2xl" />
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

export default AllUsers;
