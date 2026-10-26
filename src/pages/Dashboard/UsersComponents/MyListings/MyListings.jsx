import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCartShopping,
  FaClock,
  FaCreditCard,
  FaHouseMedical,
  FaMoneyBillWave,
  FaPhoneVolume,
  FaShieldHeart,
  FaTrash,
  FaVial,
} from "react-icons/fa6";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useListing from "../../../../hooks/useListing";

const formatPrice = (value) => Number(value || 0).toLocaleString("en-BD");

const MyListings = () => {
  const axiosSecure = useAxiosSecure();
  const [listing, refetch, isLoading] = useListing();

  const totalPrice = listing.reduce(
    (total, item) => total + Number(item.price || 0),
    0,
  );

  const handleDelete = (item) => {
    Swal.fire({
      title: "Remove this test?",
      text: `${item.name} will be removed from your test list.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, remove it",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      const res = await axiosSecure.delete(`/myListings/${item._id}`);
      if (res.data.deletedCount > 0) {
        await refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${item.name} removed`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleClearAll = () => {
    Swal.fire({
      title: "Clear your test list?",
      text: "All selected tests will be removed. You can add them again anytime.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, clear all",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      await Promise.all(
        listing.map((item) => axiosSecure.delete(`/myListings/${item._id}`)),
      );
      await refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Test list cleared",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  const handleCheckout = () => {
    if (listing.length === 0) return;

    Swal.fire({
      title: "Confirm your booking",
      html: `
        <p style="font-size:14px;color:#64748b;margin:0 0 8px">
          ${listing.length} test${listing.length > 1 ? "s" : ""} selected
        </p>
        <p style="font-size:22px;font-weight:800;color:#2563eb;margin:0">
          ৳ ${formatPrice(totalPrice)}
        </p>
      `,
      input: "select",
      inputOptions: {
        bkash: "bKash",
        nagad: "Nagad",
        card: "Debit / Credit Card",
        cash: "Pay on Sample Collection",
      },
      inputPlaceholder: "Select a payment method",
      inputValidator: (value) =>
        !value ? "Please select a payment method" : undefined,
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Confirm & Pay",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      Swal.fire({
        title: "Processing payment...",
        text: "Please wait while we confirm your booking.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading(),
      });

      try {
        await Promise.all(
          listing.map((item) => axiosSecure.delete(`/myListings/${item._id}`)),
        );
        await refetch();

        Swal.fire({
          icon: "success",
          title: "Booking confirmed!",
          text: "Our team will contact you shortly to schedule your sample collection.",
          confirmButtonColor: "#2563eb",
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Payment failed",
          text: "Something went wrong. Please try again or call our hotline.",
          confirmButtonColor: "#2563eb",
        });
      }
    });
  };

  const stats = [
    {
      label: "Selected Tests",
      value: listing.length,
      icon: <FaVial />,
      tone: "from-blue-600 to-cyan-500",
    },
    {
      label: "Total Amount",
      value: `৳ ${formatPrice(totalPrice)}`,
      icon: <FaMoneyBillWave />,
      tone: "from-emerald-500 to-teal-500",
    },
    {
      label: "Home Collection",
      value: "Free",
      icon: <FaHouseMedical />,
      tone: "from-violet-500 to-purple-500",
    },
    {
      label: "Reports Ready",
      value: "24h",
      icon: <FaClock />,
      tone: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <FaCartShopping className="text-base" /> My Test List
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-800 dark:text-white">
            Selected Diagnostic Tests
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review your selected tests, remove anything you do not need and
            confirm your booking.
          </p>
        </div>
        <Link
          to="/allTests"
          className="inline-flex w-fit items-center gap-2 rounded-xl border-2 border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:text-white"
        >
          Add More Tests <FaArrowRight className="text-xs" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.tone} text-lg text-white`}
              >
                {stat.icon}
              </span>
              <span className="truncate text-right text-xl font-extrabold text-slate-800 dark:text-white sm:text-2xl">
                {isLoading ? "-" : stat.value}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-3xl border border-slate-100 bg-slate-200/60 dark:border-slate-700 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : listing.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-800/40">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
            <FaVial />
          </span>
          <p className="mt-4 text-base font-semibold text-slate-600 dark:text-slate-300">
            Your test list is empty
          </p>
          <p className="mt-1 max-w-sm text-sm text-slate-400">
            Browse our diagnostic tests and add the ones you need. Home sample
            collection is free.
          </p>
          <Link
            to="/allTests"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:shadow-blue-900/30"
          >
            Browse Tests <FaArrowRight className="text-xs" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-700">
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                Selected Tests
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {listing.length} test{listing.length > 1 ? "s" : ""}
              </span>
            </div>

            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {listing.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-700">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <FaVial />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-white">
                      {item.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                      {item.testDetails ||
                        "Diagnostic test with certified reporting"}
                    </p>
                    <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Free home sample collection
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      ৳ {formatPrice(item.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                    >
                      <FaTrash className="text-[11px]" /> Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:shadow-black/30 lg:sticky lg:top-6">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-800 dark:text-white">
              <FaCreditCard className="text-blue-600 dark:text-blue-400" />
              Order Summary
            </h3>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-400">
                  Subtotal ({listing.length} test{listing.length > 1 ? "s" : ""})
                </dt>
                <dd className="font-semibold text-slate-800 dark:text-white">
                  ৳ {formatPrice(totalPrice)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-400">
                  Home Sample Collection
                </dt>
                <dd className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Free
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-500 dark:text-slate-400">
                  Report Delivery
                </dt>
                <dd className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Free
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center justify-between border-t border-dashed border-slate-200 pt-4 dark:border-slate-700">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                Total Payable
              </span>
              <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                ৳ {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-blue-900/30"
            >
              <FaCreditCard /> Proceed to Payment
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-600 dark:text-slate-300 dark:hover:border-rose-500/40 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
            >
              <FaTrash className="text-xs" /> Clear List
            </button>

            <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-xs text-slate-500 dark:bg-slate-900/40 dark:text-slate-400">
              <p className="flex items-start gap-2">
                <FaShieldHeart className="mt-0.5 shrink-0 text-blue-500" />
                All tests are performed by certified specialists with strict
                quality control.
              </p>
              <a
                href="tel:10101"
                className="flex items-start gap-2 font-semibold text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
              >
                <FaPhoneVolume className="mt-0.5 shrink-0 text-blue-500" />
                Need help? Call hotline 10101 (24/7)
              </a>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default MyListings;
