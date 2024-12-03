import { Link } from "react-router-dom";

const AllTests = () => {
  return (
    <div>
      <h3>Here is all test available!</h3>
      <div className="card glass w-96">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Life hack</h2>
          <p>How to park your car at your garage?</p>
          <div className="card-actions justify-end">
            <Link to="/testDetails">
              <button className="btn btn-primary">Details Test</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTests;
