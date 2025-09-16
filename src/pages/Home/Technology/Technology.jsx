import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Technology = () => {
  const axiosSecure = useAxiosSecure();

  const { data: technologies = [] } = useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/technologies");
      return res.data;
    },
  });

  return (
    <div className="mt-10">
      <h2 className="text-5xl text-center  font-semibold">
        Technology We Have
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
        {technologies.map((technology) => (
          <div key={technology._id} className="card bg-base-100  shadow-lg">
            <figure className="px-10 pt-10">
              <img
                src={technology.image}
                alt="Technology Image"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Our CT Machine</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Technology;
