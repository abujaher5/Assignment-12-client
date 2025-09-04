import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllTests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tests = [] } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tests");
      return res.data;
    },
  });

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl ">We Provide</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 p-4">
        {tests.map((item) => (
          <div className="card glass" key={item._id}>
            <figure>
              <img src={item.image} alt="TestImage" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>Price :{item.price}</p>
              <p>{item.testDetails}</p>
              <div className="card-actions justify-center">
                <Link to={`/testDetails/${item._id}`}>
                  <button className="btn btn-primary">Details Test</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTests;
