import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon, label, onClick, mobile = false }) => {
  const base = mobile
    ? "w-full whitespace-nowrap rounded-xl border-l-4 px-4 py-3 text-sm"
    : "whitespace-nowrap rounded-lg px-2.5 py-2 text-xs xl:px-4 xl:text-sm";

  return (
    <li className={mobile ? "w-full" : "relative"}>
      <NavLink
        to={to}
        end={to === "/"}
        onClick={onClick}
        className={({ isActive }) =>
          [
            "group relative flex items-center gap-2 font-semibold uppercase tracking-wide transition-all duration-300",
            base,
            mobile
              ? isActive
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                : "border-transparent text-slate-600 hover:border-blue-300 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
              : isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400",
          ].join(" ")
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`text-base transition-transform duration-300 group-hover:scale-110 ${
                isActive ? "text-blue-600 dark:text-blue-400" : ""
              }`}
            >
              {icon}
            </span>
            <span>{label}</span>
            {!mobile && (
              <span
                className={`absolute -bottom-1 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 ${
                  isActive ? "w-7" : "w-0 group-hover:w-7"
                }`}
              />
            )}
          </>
        )}
      </NavLink>
    </li>
  );
};

export default NavItem;
