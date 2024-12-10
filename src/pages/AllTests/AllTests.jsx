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
  console.log(tests);
  return (
    <div className="grid grid-cols-3">
      {tests.map((item) => (
        <div className="card glass w-96" key={item._id}>
          <figure>
            <img src={item.image} alt="car!" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>Price :{item.price}</p>
            <p>{item.testDetails}</p>
            <div className="card-actions justify-center">
              <Link to="/testDetails">
                <button className="btn btn-primary">Details Test</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTests;
