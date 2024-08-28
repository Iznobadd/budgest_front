import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  useEffect(() => {
    // Fonction pour mettre à jour l'état de la barre latérale
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // `768px` correspond à la taille de breakpoint md
        setOpenSidebar(true); // Ouvrir la barre latérale sur les écrans de taille moyenne et plus grands
      } else {
        setOpenSidebar(false); // Fermer la barre latérale sur les petits écrans
      }
    };

    // Ajouter l'écouteur d'événements lors du montage
    window.addEventListener("resize", handleResize);

    // Appeler la fonction pour définir l'état initial
    handleResize();

    // Nettoyer l'écouteur d'événements lors du démontage
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isAuthenticated ? (
    <>
      <Sidebar
        isOpen={openSidebar}
        toggleSidebar={() => setOpenSidebar(!openSidebar)}
      />
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          openSidebar ? "pl-72" : "pl-0"
        }`}
      >
        <Header
          isOpen={openSidebar}
          toggleSidebar={() => setOpenSidebar(!openSidebar)}
        />
        {openSidebar && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpenSidebar(false)}
          />
        )}
        <div className="mt-16 relative p-6">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default DashboardLayout;
