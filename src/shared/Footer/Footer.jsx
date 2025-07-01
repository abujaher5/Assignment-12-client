import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../assets/FamousDiagnosticLogo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-neutral text-neutral-content p-10">
        <aside>
          <Link to={"/"}>
            <img src={logo} alt="" className="h-16 w-16 rounded-full" />
          </Link>
          <p>
            Famous Diagnostic Center.
            <br />
            Providing reliable medical service and care
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Connect With Us</h6>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTwitter size={22} />
            </a>
            <a>
              <FaYoutube size={22} />
            </a>
            <a>
              <FaFacebook size={22} />
            </a>
          </div>
        </nav>
      </footer>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Famous Diagnostic Center
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
