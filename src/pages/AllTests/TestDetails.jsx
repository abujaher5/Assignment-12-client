import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaMicroscope,
  FaXRay,
  FaHeartPulse,
  FaVial,
  FaArrowLeft,
  FaCartPlus,
  FaClock,
  FaHouseMedical,
  FaShieldHeart,
  FaClipboardCheck,
  FaChevronRight,
} from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const categoryStyles = {
  pathology: {
    label: "Pathology",
    icon: <FaMicroscope />,
    class: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  },
  radiology: {
    label: "Radiology",
    icon: <FaXRay />,
    class:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
  },
  imaginary: {
    label: "Imaging",
    icon: <FaHeartPulse />,
    class: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  },
};

const features = [
  { icon: <FaClock />, title: "Fast Reporting", text: "Report within 24 hours" },
  {
    icon: <FaHouseMedical />,
    title: "Home Collection",
    text: "Free sample pickup at home",
  },
  {
    icon: <FaShieldHeart />,
    title: "Certified Labs",
    text: "Accredited & hygienic",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Expert Analysis",
    text: "Verified by specialists",
  },
];

const TestDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { name, price, testDetails, image, category, _id } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const meta = categoryStyles[category] || {
    label: category || "General",
    icon: <FaVial />,
    class: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  };

  const handleAddToListing = () => {
    if (user?.email) {
      const listingItem = {
        listingId: _id,
        email: user.email,
        name,
        image,
        price,
        testDetails,
      };
      axiosSecure.post("/myListings", listingItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} booked successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myListings");
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to book this test",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Please Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <section className="bg-slate-50 py-10 dark:bg-[#1c2229] lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400 sm:text-sm">
          <Link to="/" className="transition hover:text-blue-600">
            Home
          </Link>
          <FaChevronRight className="text-[10px]" />
          <Link to="/allTests" className="transition hover:text-blue-600">
            All Tests
          </Link>
          <FaChevronRight className="text-[10px]" />
          <span className="truncate text-slate-600 dark:text-slate-300">
            {name}
          </span>
        </nav>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-72 lg:h-full lg:min-h-[480px]">
              <img
                src={image}
                alt={name}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold shadow-sm backdrop-blur ${meta.class}`}
              >
                {meta.icon}
                {meta.label}
              </span>
            </div>

            <div className="flex flex-col p-6 sm:p-8 lg:p-10">
              <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white lg:text-3xl">
                {name}
              </h1>

              <div className="mt-4 inline-flex w-fit items-baseline gap-1 rounded-2xl bg-blue-50 px-5 py-3 dark:bg-blue-500/10">
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  ৳ {price}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  per test
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  About This Test
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {testDetails ||
                    "Accurate and reliable diagnostic testing performed by our certified specialists."}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-700 dark:bg-slate-900/40"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-sm text-blue-600 dark:text-blue-400">
                      {feature.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-white">
                        {feature.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleAddToListing}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-blue-900/30"
                >
                  <FaCartPlus /> Book This Test
                </button>
                <Link
                  to="/allTests"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-600 dark:text-slate-300"
                >
                  <FaArrowLeft /> Back to Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestDetails;
