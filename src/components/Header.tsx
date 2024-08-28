import { IoMdMenu } from "react-icons/io";
import { SidebarProps } from "../types";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
const Header = ({ isOpen, toggleSidebar }: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 right-0 border-b border-b-gray-200 shadow-sm px-6 w-[calc(100% - 64px)] h-16 ${
        isOpen ? "left-72" : "left-0"
      }`}
    >
      <div className="relative flex items-center h-full">
        {!isOpen && (
          <div className="flex items-center justify-start py-4 gap-4 h-16 overflow-hidden max-h-full transition-all duration-300">
            <div>
              <IoMdMenu
                size={24}
                className="cursor-pointer"
                onClick={toggleSidebar}
                aria-expanded={isOpen}
              />
            </div>
            <div className="relative">
              <Link to={""} className="relative inline-block">
                <img src={Logo} alt="Budgest" className="max-h-9 w-auto" />
              </Link>
            </div>
          </div>
        )}
        <div className="ml-auto">
          <h1>Brandon</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
