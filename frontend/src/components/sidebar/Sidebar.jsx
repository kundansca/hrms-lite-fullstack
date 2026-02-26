import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THEME } from "./theme";
import MobileHeader from "./MobileHeader";
import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import { MENU_ITEMS } from "./menuItems";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openMobileMenu = () => {
    setIsMobileOpen(true);
    setIsCollapsed(false);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const toggleSubmenu = (name) => {
    if (isCollapsed) setIsCollapsed(false);

    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      <MobileHeader onOpen={openMobileMenu} />

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? "80px" : "288px",
        }}
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col h-full border-r border-gray-800 
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:relative md:h-screen
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          backgroundColor: THEME.colors.background,
          color: THEME.colors.link,
        }}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          toggleCollapse={() => setIsCollapsed(!isCollapsed)}
          closeMobile={closeMobileMenu}
        />

        <SidebarMenu
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          openSubmenus={openSubmenus}
          menuItems={MENU_ITEMS}
          toggleSubmenu={toggleSubmenu}
          closeMobile={closeMobileMenu}
        />
      </motion.aside>
    </>
  );
}
