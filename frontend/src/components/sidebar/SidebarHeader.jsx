import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { THEME } from "./theme";

export default function SidebarHeader({
  isCollapsed,
  toggleCollapse,
  closeMobile,
}) {
  return (
    <div className="flex items-center h-20 shrink-0 relative transition-all duration-300 justify-start px-6">
      <a
        href="#"
        className="flex items-center gap-3 overflow-hidden"
        onClick={closeMobile}
      >
        <div className="flex-shrink-0 w-[2rem] h-[2rem] rounded-full grid place-items-center">
          <img
            src="/assets/logo.svg"
            width={26}
            height={26}
            alt="Logo"
            className="object-cover w-full h-full transition-transform duration-500 ease-out"
          />
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-bold text-xl whitespace-nowrap overflow-hidden"
            >
              HRMS
            </motion.span>
          )}
        </AnimatePresence>
      </a>

      <button
        onClick={toggleCollapse}
        className="hidden md:flex absolute right-[-14px] top-7 text-white rounded-full p-1.5 border border-gray-700 hover:bg-gray-600 transition-colors z-50 shadow-md cursor-pointer"
        style={{ backgroundColor: THEME.colors.accent }}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <button
        onClick={closeMobile}
        className="md:hidden absolute right-4 p-1 text-gray-400 hover:text-white"
      >
        <X size={24} />
      </button>
    </div>
  );
}
