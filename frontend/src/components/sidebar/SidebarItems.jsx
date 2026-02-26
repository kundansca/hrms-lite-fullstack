import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { THEME } from "./theme";

export default function SidebarItem({
  item,
  isCollapsed,
  isMobileOpen,
  isOpen,
  onToggle,
  onLinkClick,
}) {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = item.href ? pathname === item.href : false;
  const hasSubmenu = !!item.items;

  const handleMouseEnter = (e) => {
    if (!isActive && !isOpen)
      e.currentTarget.style.backgroundColor = THEME.colors.hover;
  };

  const handleMouseLeave = (e) => {
    if (!isActive && !isOpen)
      e.currentTarget.style.backgroundColor = "transparent";
  };

  const accentClass = "group-hover:text-amber-300";
  const submenuAccentClass = "hover:text-amber-300";

  const labelVariants = {
    collapsed: {
      opacity: 0,
      width: 0,
      display: "none",
      transition: { duration: 0.2 },
    },
    expanded: {
      opacity: 1,
      width: "auto",
      display: "block",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const chevronVariants = {
    collapsed: { opacity: 0, width: 0, display: "none" },
    expanded: { opacity: 1, width: "auto", display: "block" },
  };

  const containerCommonClasses = `
    flex items-center 
    justify-start 
    px-6 py-3 
    transition-colors duration-200 
    w-full 
    overflow-hidden
    relative
  `;

  const contentWrapperClasses = `
    flex items-center 
    overflow-hidden
    transition-all duration-200
    ${isCollapsed ? "gap-0" : "gap-4"}
  `;

  if (hasSubmenu) {
    return (
      <div className="relative">
        <button
          onClick={onToggle}
          className={`${containerCommonClasses} group`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            backgroundColor: isOpen ? THEME.colors.active : "transparent",
          }}
        >
          <div className={contentWrapperClasses}>
            <item.icon
              size={26}
              className={`min-w-[26px] transition-colors duration-200 ${accentClass}`}
            />

            <motion.span
              variants={labelVariants}
              initial={false}
              animate={isCollapsed ? "collapsed" : "expanded"}
              className={`whitespace-nowrap font-medium text-[15px] transition-colors duration-200 ${accentClass}`}
            >
              {item.name}
            </motion.span>
          </div>

          <motion.div
            variants={chevronVariants}
            initial={false}
            animate={isCollapsed ? "collapsed" : "expanded"}
            className="flex items-center ml-auto"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 ${accentClass} ${
                isOpen ? "rotate-90" : ""
              }`}
            />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && !isCollapsed && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-[#050a0e]"
            >
              {item.items?.map((sub) => (
                <li key={sub.name}>
                  <Link
                    to={sub.href}
                    onClick={onLinkClick}
                    className={`block py-2.5 pr-8 pl-[4.25rem] text-white text-[14.5px] transition-colors duration-200 whitespace-nowrap opacity-70 hover:opacity-100 ${submenuAccentClass}`}
                    style={{
                      color: THEME.colors.link,
                    }}
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Link
        to={item.href || "#"}
        onClick={onLinkClick}
        className={`${containerCommonClasses} ${
          !isCollapsed ? "gap-4" : "gap-0"
        }`}
        style={{
          backgroundColor: isActive ? THEME.colors.active : "transparent",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <item.icon
          size={26}
          className={`min-w-[26px] transition-colors duration-200 ${accentClass}`}
        />

        <motion.span
          variants={labelVariants}
          initial={false}
          animate={isCollapsed ? "collapsed" : "expanded"}
          className={`whitespace-nowrap font-medium text-[15px] transition-colors duration-200 ${accentClass}`}
        >
          {item.name}
        </motion.span>
      </Link>
    </div>
  );
}
