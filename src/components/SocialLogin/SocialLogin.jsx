import { FaGoogle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { getAuthErrorMessage } from "../../utils/authErrors";

const SocialLogin = ({ from = "/" }) => {
  const navigate = useNavigate();
  const { googleLogIn } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleGoogleLogIn = async () => {
    try {
      const result = await googleLogIn();

      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        status: "Active",
        image: result.user?.photoURL,
      };

      await axiosPublic.post("/users", userInfo);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Welcome, ${result.user?.displayName || "User"}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google sign-in failed",
        text: getAuthErrorMessage(error),
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-600" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          or
        </span>
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-600" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogIn}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      >
        <FaGoogle className="text-[#EA4335]" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
