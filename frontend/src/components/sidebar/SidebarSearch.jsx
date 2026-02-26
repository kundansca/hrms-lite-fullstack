import React, { useRef } from "react";
import { Search } from "lucide-react";
import { THEME } from "./theme";

export default function SidebarSearch({ isCollapsed, setExpanded }) {
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    if (isCollapsed) {
      setExpanded();
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <div className="px-4 mb-6 relative group shrink-0">
      <div
        role="button"
        tabIndex={isCollapsed ? 0 : -1}
        onKeyDown={handleKeyDown}
        onClick={handleSearchClick}
        className="flex items-center rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        style={{
          backgroundColor: THEME.colors.inputBg,
          height: "42px",
          width: "100%",
          cursor: isCollapsed ? "pointer" : "text",
        }}
      >
        <div className="w-12 h-full flex items-center justify-center flex-shrink-0 pointer-events-none">
          <Search size={22} className="text-gray-700" />
        </div>

        <input
          ref={inputRef}
          tabIndex={isCollapsed ? -1 : 0}
          type="search"
          placeholder="Search..."
          className={`
            bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 text-sm h-full w-full pr-3
            transition-all duration-300 ease-in-out origin-left
            ${isCollapsed ? "opacity-0 scale-x-0 w-0 p-0" : "opacity-100 scale-x-100"}
          `}
        />
      </div>
    </div>
  );
}
