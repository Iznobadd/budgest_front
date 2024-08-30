import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { menu } from "./Menu";
import { MenuItem, SidebarProps } from "../../types";
import { IoArrowBack, IoChevronForward } from "react-icons/io5";
import { useState } from "react";
const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
  const location = useLocation();

  const handleToggleSubMenu = (index: number) => {
    setOpenSubMenu((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      className={`bg-white border-r border-r-gray-200 w-72 fixed max-h-screen h-full min-h-screen top-0 left-0 z-50 transition-all duration-300 shadow-sm ${
        !isOpen ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="flex items-center justify-between py-4 px-6 min-w-full w-72 h-16 overflow-hidden max-h-full">
        <div>
          <IoArrowBack
            size={24}
            className="cursor-pointer"
            onClick={toggleSidebar}
            aria-expanded={isOpen}
          />
        </div>
        <div className="relative flex-shrink-0">
          <Link to={""} className="relative inline-block">
            <img src={Logo} alt="Budgest" className="max-h-9 w-auto" />
          </Link>
        </div>
      </div>
      <div className="overflow-hidden w-full max-h-full">
        <div className="flex flex-col h-[calc(100vh-64px)]">
          <div className="h-full pt-4 pb-10 relative content-start">
            <ul className="list-none">
              {menu.map((item: MenuItem, index: number) =>
                item.head ? (
                  <li key={index} className="px-6 pt-1 pb-2">
                    <h6 className="text-neutral-light leading-5 font-bold whitespace-nowrap flex items-center gap-2">
                      {item.icon} {item.name}
                    </h6>
                  </li>
                ) : (
                  <li
                    key={index}
                    className="py-1 px-3 relative text-neutral-light"
                    onClick={() => item.hasSub && handleToggleSubMenu(index)}
                  >
                    <Link
                      to={item.link}
                      className={`flex items-center gap-2 pr-7 py-2 pl-3 rounded-lg hover:bg-primary hover:text-white transition-all duration-200 ${
                        location.pathname === item.link
                          ? "bg-primary text-white"
                          : ""
                      } ${
                        item.hasSub && openSubMenu === index ? "bg-primary" : ""
                      }
                      }`}
                    >
                      {item.icon} {item.name}
                    </Link>
                    {item.hasSub && (
                      <IoChevronForward
                        className={`absolute cursor-pointer right-10 top-4 transition-transform duration-200 ${
                          openSubMenu === index ? "rotate-90" : ""
                        }`}
                        size={16}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSubMenu(index);
                        }}
                      />
                    )}
                    {item.hasSub && openSubMenu === index && (
                      <ul className="pl-8 mt-2 list-none">
                        {item.sub?.map((subItem, subIndex) => (
                          <li
                            key={subIndex}
                            className="py-1 px-4 hover:bg-gray-200 rounded-sm"
                          >
                            <Link
                              to={subItem.link}
                              className="flex items-center space-x-3"
                            >
                              <span>{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
